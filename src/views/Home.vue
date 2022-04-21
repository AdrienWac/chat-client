<template>
  <div class="home">
    <aside :class="asideIsOpen ? `aside--open` : `aside--close`">
      <div class="aside__icons">
        <Hamburger v-if="!asideIsOpen" :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="40" width="40" @click="setAsideState()" />
        <XmarkSvg v-if="asideIsOpen" :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="40" width="40" @click="setAsideState()" />
      </div>
      <ul class="aside__users">
        <!-- Connecté avec message et notifications -->
        <li class="aside-users__item" data-state="online" > 
            <div class="item__profil-pic">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <div class="item__informations">
                <span class="item__username">Adrien Lambert</span>
                <span class="item__last-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure qui iusto accusantium necessitatibus 
                  molestiae omnis. Omnis et sed voluptates, culpa vero nobis ad nostrum pariatur. Aspernatur sint exercitationem voluptas doloremque.</span>
            </div>
            <div class="item__notification"><span class="badge">10+</span></div>
        </li>
        <!-- Connecté sans message avec notification -->
        <li class="aside-users__item" data-state="online" > 
            <div class="item__profil-pic">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <div class="item__informations">
                <span class="item__username">Adrien Lambert</span>
            </div>
            <div class="item__notification"><span class="badge">2</span></div>
        </li>
        <!-- Connecté avec message sans notification -->
        <li class="aside-users__item" data-state="online" > 
            <div class="item__profil-pic">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <div class="item__informations">
                <span class="item__username">Adrien Lambert</span>
                <span class="item__last-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure qui iusto accusantium necessitatibus 
                  molestiae omnis. Omnis et sed voluptates, culpa vero nobis ad nostrum pariatur. Aspernatur sint exercitationem voluptas doloremque.</span>
            </div>
            
        </li>
        <!-- Non Connecté sans message sans notification -->
        <li class="aside-users__item" data-state="offline" > 
            <div class="item__profil-pic">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <div class="item__informations">
                <span class="item__username">Adrien Lambert</span>
            </div>
        </li>
      </ul>
    </aside>
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
import Hamburger from '../components/svg/Hamburger.vue'
import XmarkSvg from '../components/svg/Xmark.vue'
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




    // ------------------------- Intégration -------------------------
    let asideIsOpen = ref(true);
    const setAsideState = () => {
      asideIsOpen.value  = !asideIsOpen.value;
    }







    
    return { user, listUsers, selectedUser, sendMessage, setAsideState, asideIsOpen };

  },
  components: {
    Aside,
    Form,
    AlertPage,
    CommentSlash,
    MousePointer,
    Hamburger,
    XmarkSvg,
    Header,
    TypingAnimation,
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/home.scss'; 


  @media only screen and (max-width: 64em) {
    .aside--open { width: 250px; }
    .aside--close { width: 75px; }
  }
  @media only screen and (min-width: 64.063em) {
    .aside--open { width: 300px; }
    .aside--close { width: 100px; }
  }

  aside {
    // background: red;
    height: 100vh;
    transition: width 1s;
  }

  .aside--open {

    .aside__users {
      
      .aside-users__item[data-state="offline"] .item__profil-pic img { border-color: map-get($colors, offline );}
      .aside-users__item[data-state="online"] .item__profil-pic img { border-color: map-get($colors, online );}

      .aside-users__item:hover, .list-users__item.selected {
          cursor: pointer;
          background: rgba(0 , 0, 0, 0.05);
      }

      .aside-users__item {

          margin: 5px 0;
          padding: 10px;
          display: grid;
          grid-template-columns: 2fr 9fr 1fr;

          .item__profil-pic img {
              border: 2px solid;
              border-radius: 50%;
              padding: 5px;
              width:32px;
              height:32px;
          }

          .item__username {
              display: flex;
              flex-direction: column;
              justify-content: center;
              font-weight: normal;
              font-size: 1.2rem;
              padding: 0 5px;
          }
          
          .item__last-message {
            text-overflow: ellipsis;
            overflow: hidden;
            width: 190px;
            display: block;
            white-space: nowrap;
            padding: 0 5px;
          }

          .item__notification {
              display: flex;
              flex-direction: column;
              justify-content: center;
              
              .badge {
                  display: block;
                  height: 24px;
                  width: 24px;
                  border-radius: 50%;
                  background: map-get($colors, notification);
                  text-align: center;
                  line-height: 22px;
                  font-weight: bold;
                  color: #fff;
                  font-size: 0.7rem;
              }

          }

      }

}
  }

  .aside--close {

    .aside__users {
      
      .aside-users__item[data-state="offline"] .item__profil-pic img { border-color: map-get($colors, offline );}
      .aside-users__item[data-state="online"] .item__profil-pic img { border-color: map-get($colors, online );}

      .aside-users__item:hover, .list-users__item.selected {
          cursor: pointer;
          background: rgba(0 , 0, 0, 0.05);
      }

      .aside-users__item {

          margin: 5px 0;
          padding: 10px;
          display: grid;
          grid-template-columns: 2fr 9fr 1fr;
          position: relative;

          .item__profil-pic img {
              border: 2px solid;
              border-radius: 50%;
              padding: 5px;
              width:40px;
              height:40px;
          }

          .item__username {
              
              display: none;
              flex-direction: column;
              justify-content: center;
              font-weight: normal;
              font-size: 1.2rem;
              padding: 0 5px;
          }

          .item__last-message {
            display: none;
          }

          .item__notification {
              position: absolute;
              bottom: 0px;
              right: 30%;

              
              .badge {
                  display: block;
                  height: 24px;
                  width: 24px;
                  border-radius: 50%;
                  background: map-get($colors, notification);
                  text-align: center;
                  line-height: 22px;
                  font-weight: bold;
                  color: #fff;
                  font-size: 0.7rem;
              }

          }

      }

    }
  }


  main {
    background: green;
  }
</style>