<template>
  <div class="home">
    <Aside />
    <main>

    </main>

  </div>

</template>

<script>
// @ is an alias to /src
import Socket from '../socket'
import {ref, onMounted, watch, computed} from 'vue'
import Header from '../components/chat/Header.vue'
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
    
    return { user, listUsers, selectedUser, sendMessage};

  },
  components: {
    Aside,
    Form,
    AlertPage,
    CommentSlash,
    MousePointer,
    Header,
    TypingAnimation,
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/home.scss'; 


  main {
    background: green;
  }
</style>