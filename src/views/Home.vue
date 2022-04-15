<template>
  <div class="home">
    
    <Aside :listUsers="listUsers"/>

    <main :class="`${selectedUser.id ? 'main--full' : ''}`">

      <div class="forum">

        <div class="forum__header">
          <div :data-state="`${selectedUser.is_connected ? 'online' : 'offline'}`" class="user header__user" v-if="selectedUser.id">
            {{selectedUser.username}}
          </div>
        </div>

        <div class="forum__list">

          <btn @click="simumlateDeconnection" >Simulation déconnexion</btn>

          <ul v-if ="selectedUser.id">

            <li v-if ="selectedUser.messages?.length > 0" class="message__card" v-for="message in selectedUser.messages">
              
              <div class="message__aside">
                <img alt="Vue logo" src="../assets/logo.png">
              </div>

              <div class="message__main">

                <div class="message__main-header"> 
                  <span :data-state="`${selectedUser.is_connected ? 'online' : 'offline'}`" class="message__sender user"> {{ message.fromSelf ? user.username : selectedUser.username }} </span> 
                  <span class="message__time"> 04/02/2022 - 14h55 </span> 
                </div>

                <div class="message__content"> {{ message.content }} </div>

              </div>
        
            </li>

            <AlertPage v-else :colors="{icon: `#000`, message:`#000`}">
              <template v-slot:icon>
                <CommentSlash :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="32" width="32" />
              </template>
              <template v-slot:message>Aucun message à afficher</template>
            </AlertPage>
            
          </ul>
          
          <AlertPage v-else :colors="{icon: `#000`, message:`#000`}">
            <template v-slot:icon>
              <MousePointer :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="32" width="32" />
            </template>
            <template v-slot:message>Sélectionner un utilisateur</template>
          </AlertPage>

        </div>

      </div>

      <div v-if="selectedUser.is_connected" class="main__form">

        <div class="form__header" :data-visibility="`${selectedUser.is_typing ? 'show' : 'hidden'}`">
          <div class="header__test">
            <!-- TODO Revoir l'affichage de cette animation -->
            <TypingAnimation v-if="selectedUser?.is_typing" :text="`${selectedUser.username} écrit`" :showText="true"/>
          </div>
        </div>

        <Form @sendMessage="sendMessage"/>

      </div>

    </main>

  </div>

</template>

<script>
// @ is an alias to /src
import Socket from '../socket'
import {ref, onMounted, watch, computed} from 'vue'
import Aside from '../components/chat/Aside.vue'
import Form from '../components/chat/Form.vue'
import AlertPage from '../components/chat/Alert.vue'
import TypingAnimation from '../components/chat/TypingAnimation.vue'
import CommentSlash from '../components/svg/CommentSlash.vue'
import MousePointer from '../components/svg/MousePointer.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export default {
  name: 'Home',
  data: () => ({
    form: {
      username: null
    },
    
  }),
  setup() {
    
    const store = useStore();
    const router = useRouter();
    let listUsers = ref([]);

    const selectedUser = computed(() => store.getters['chat/selectedUser']);

    let user = JSON.parse(localStorage.getItem('user'));

    const initSocket = () => { 
      Socket.auth = {...user};
      Socket.connect();
    }

    onMounted(() => {
      initSocket();
    });

    Socket.on("connect_error", (err) => { console.log('errr', err, err.message); });

    Socket.on('users', (arrayUsers) => store.dispatch('chat/generateListUsers', arrayUsers));

    const simumlateDeconnection = () => {
      console.log('SIMULATION D\'UNE DECONNECTION');
      store.dispatch('chat/setUserConnectedStatus', {user: {
        created: "2022-04-15T11:27:44.000Z",
        hasNewMessages: 0,
        id: 60,
        is_connected: true,
        messages: [],
        self: true,
        sessionId: "babf81d7822607fd",
        updated: "2022-04-15T11:27:44.000Z",
        username: "player113",
      }, status: false})
    }

    // Quand un autre socket se déconnecte
    Socket.on('user disconected', (userInformation) => {
      console.log(`L'utilisateur ${userInformation.id} s'est déconnecté.`, store.getters['chat/selectedUser']);
      store.dispatch('chat/setUserConnectedStatus', {user: userInformation, status: false});
      // TODO si c'est l'utilisateur sélectionné, il faut mettre à jour son état de sélection
      if (store.getters['chat/selectedUser']?.id === userInformation.id) {
        store.dispatch('chat/setSelectedUserConnectedStatus', false);
      }
    });

    // Signout event from Bro
    Socket.on('signout', async (user) => {
      
      const userFromStorage = JSON.parse(localStorage.getItem('user'));

      store.dispatch('user/logout', user);

      router.push({name: 'Register'});
      
    });

    const sendMessage = (content) => {
      // TODO Refacto passer par chat service (composition avec en attribut Socket)
      console.log('Send Message', content, selectedUser.value.id);

      Socket.emit('private message', {
        content,
        recipientUser: selectedUser.value
      });

      store.dispatch('chat/sendMessage', {content: content, senderUser: user, recipientUser: selectedUser.value});

    };

    Socket.on('private message', ({content, from, to}) => {

      console.log('Receive message', content, from, to);

      if (from.id === user.id) {
        console.log(`C\'est envoyé depuis un frère pour ${to.username}`);
        store.dispatch('chat/receiveMessage', {content: content, senderUser: to, recipientUser: from, fromSelf: true});
      } else {
        store.dispatch('chat/receiveMessage', {content: content, senderUser: from, recipientUser: to, fromSelf: false});
      }


    });
    
    return { user, listUsers, selectedUser, sendMessage, simumlateDeconnection };

  },
  components: {
    Aside,
    Form,
    AlertPage,
    CommentSlash,
    MousePointer,
    TypingAnimation,
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/home.scss';
</style>