<template>
  <div class="home">

    <Aside />
    
    <main>
      
      <Header />

      <article :class=" `${selectedUser.id ? 'article--user-selected' : 'article--user-not-selected'} forum__container` ">

        <Forum />

      </article>

      <footer>
        <Form v-if="selectedUser.is_connected" @sendMessage="sendMessage"/>
      </footer>

    </main>

  </div>

</template>

<script>
// @ is an alias to /src
import Socket from '../socket'
import {ref, onMounted, watch, computed} from 'vue'
import Header from '../components/chat/Header.vue'
import Aside from '../components/chat/Aside.vue'
import Forum from '../components/chat/Forum.vue'
import Form from '../components/chat/Form.vue'
import AlertPage from '../components/chat/Alert.vue'
import TypingAnimation from '../components/chat/TypingAnimation.vue'
import CommentSlash from '../components/svg/CommentSlash.vue'
import MousePointer from '../components/svg/MousePointer.vue'
import PowerOff from '../components/svg/PowerOff.vue'
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

    let user = JSON.parse(localStorage.getItem('user'));

    let selectedUser = computed(() => store.getters['chat/selectedUser']);

    const initSocket = () => { 
      Socket.auth = {...user};
      Socket.connect();
    }

    onMounted(() => {
      initSocket();
    });

    Socket.on("connect_error", (err) => { console.log('errr', err, err.message); });

    Socket.on('users', (arrayUsers) => store.dispatch('chat/generateListUsers', arrayUsers));

    // Quand un autre socket se déconnecte
    Socket.on('user disconected', (userInformation) => {
      console.log(`L'utilisateur ${userInformation.id} s'est déconnecté.`, store.getters['chat/selectedUser']);
      store.dispatch('chat/setUserConnectedStatus', {user: userInformation, status: false});
      // Si c'est l'utilisateur sélectionné, il faut mettre à jour son état de sélection
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

      const messageDatas = {content: content, senderUser: user, recipientUser: selectedUser.value, date: store.getters['chat/currentFormatedDate']};

      Socket.emit('private message', messageDatas);

      store.dispatch('chat/sendMessage', messageDatas);

    };

    Socket.on('private message', ({content, from, to, date}) => {

      console.log('Receive message', content, from, to);

      if (from.id === user.id) {
        console.log(`C\'est envoyé depuis un frère pour ${to.username}`);
        store.dispatch('chat/receiveMessageFromBro', {content: content, senderUser: from, recipientUser: to, fromSelf: true, date});
      } else {
        store.dispatch('chat/receiveMessage', {content: content, senderUser: from, recipientUser: to, fromSelf: false, date});
      }


    });
    
    return { user, selectedUser, listUsers, sendMessage};

  },
  components: {
    Aside,
    Header,
    Forum,
    Form,
    AlertPage,
    CommentSlash,
    MousePointer,
    PowerOff,
    TypingAnimation,
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/home.scss'; 
  @import '../assets/scss/common.scss'; 

  @import '../assets/scss/mobile/home.scss';
  @import '../assets/scss/desktop/home.scss';

  main {

    display: grid;
    grid-template-rows: 1fr 9fr 2fr;
    max-height: 100vh;
    overflow: hidden;

    article {

      border-top: 1px solid map-get($colors, primary);
      border-bottom: 1px solid map-get($colors, primary);
      display: flex;
      flex-direction: column-reverse;

    }

    .article--user-selected { overflow-y: scroll; } 

    .article--user-not-selected {
      align-items: center;
      justify-content: center;
    }

    footer {
      height: 100%;
      padding: 10px;
    }
    
  }
</style>