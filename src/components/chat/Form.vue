<template>
  
  <div>
    
    <form @submit.prevent="onSubmit" class="form">
      <textarea v-model="content" placeholder="Your message..." class="input" @keyup.ctrl.exact="onSubmit"/>
      <button :disabled="!isValid" class="send-button">
        <PaperPlane :stroke="{color: 'transparent', width:3}" :fill="'#fff'" height="24" width="24" />
      </button>
    </form>

  </div>

</template>

<script>

import { ref, computed, watch } from 'vue';
import {useStore} from 'vuex'
import PaperPlane from '../svg/PaperPlane.vue'
import Socket from '../../socket'

export default {
    components: {
      PaperPlane
    },
    setup(props, context) {

        let content = ref('');
        
        let isValid = computed(() => content.value.length > 0);

        const store = useStore();

        const onSubmit = () => {
            context.emit('sendMessage', content.value);
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

        return {content, isValid, onSubmit};   
    }
}
</script>

<style scoped lang="scss">
button{display:flex; flex-direction: row;align-items: center;justify-content: center;}
</style>