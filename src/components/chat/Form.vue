<template>
  
    <form @submit.prevent="onSubmit" class="form">
      <!-- FIXME Changer le @keyup pour faire une combinaison CTRL + Entrée -->
      <textarea 
        v-model="content" 
        placeholder="Your message..."
        required=true
        class="input" 
        @keyup.ctrl.exact="onSubmit"
        ref="message"
      />
      <button :disabled="!isValid" class="send-button">
        <PaperPlane :stroke="{color: 'transparent', width:3}" :fill="'#fff'" height="24" width="24" />
      </button>
    </form>


</template>

<script>

import { ref, computed, watch, watchEffect } from 'vue'
import {useStore} from 'vuex'
import PaperPlane from '../svg/PaperPlane.vue'
import Socket from '../../socket'
import UserService from '../../services/user.service';

export default {
    components: {
      PaperPlane,
    },
    setup(props, context) {

        let content = ref('');

        let message = ref(null);
        
        let isValid = computed(() => content.value.length > 0);

        const store = useStore();

        const onSubmit = () => {
            context.emit('sendMessage', content.value);
            // UserService.sendMessage({content: content.value, to: {username: 'Player1'}, from: {username: 'Player2'}});
            content.value = '';
        }

        const user = JSON.parse(localStorage.getItem('user'));


        watch(content, (newValue, oldValue) => {
          // Si l'ancienne value est vide et que la nouvelle est pleine
          if (!oldValue.length && newValue.length) {
            Socket.emit('user typing', { content: content.value, userSender: user, userReceiver:  store.getters['chat/selectedUser']});
          } else if(!newValue.length && oldValue.length) {
            Socket.emit('user typing', { content: content.value, userSender: user, userReceiver:  store.getters['chat/selectedUser']});
          }
        });

         // TODO a refacto
          Socket.on('end typing', ({user: userWhoTyping}) => store.dispatch('chat/detectTypingMessage', {user: userWhoTyping, state: false}));

          Socket.on('start typing', ({user: userWhoTyping}) => store.dispatch('chat/detectTypingMessage', {user: userWhoTyping, state: true}));
        
          const selectedUser = computed(() => store.getters['chat/selectedUser']);

          watchEffect(async () => {
            if (Object.keys(selectedUser.value).length > 0) {
              message.value.focus();
            }
          });


        return {content, isValid, onSubmit, message, selectedUser};   
    }
}
</script>

<style scoped lang="scss">
form {
  display: grid;
  grid-template-columns: 10fr 2fr;
  height: 50%;
}
textarea {border: 1px solid map-get($colors, second);}
button {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: map-get($colors, primary);
  border: 1px solid map-get($colors, second);
}
button:hover {
  cursor: pointer;
  background-color: lighten(map-get($colors, primary), 20%);
}
button:disabled {
background-color: lighten(map-get($colors, black), 50%);
cursor: not-allowed;
}
</style>