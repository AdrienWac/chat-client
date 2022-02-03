<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Aside :users="listUsers" :room="'sqqs'" @selectionUser="selectUser"/>
    Utilisateur sélectionné : {{selectedUser.userId}}
    <Form @sendMessage="sendMessage" v-if="selectedUser.userId"/>
    <div v-if="selectedUser.userId">
      <p>Discussion avec {{selectedUser.username}}</p>
      <ul>
        <li v-for="message in selectedUser.messages">

            <span>{{message.fromSelf ? "Moi" : selectedUser.username}}</span>
            <span>{{message.content}}</span>

        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Socket from '../socket'
import {ref, onMounted} from 'vue'
import Aside from '../components/chat/Aside.vue'
import Form from '../components/chat/Form.vue'


export default {
  name: 'Home',
  data: () => ({
    form: {
      username: null
    },
    
  }),
  // methods: {
  //     selectUser(user) {
  //         console.log('select user', user);
  //         // this.$emit('selectionUser', user);
  //     }
  // },
  setup() {

    let listUsers = ref([]);

    let user = JSON.parse(sessionStorage.getItem('user'));

    const initSocket = () => { Socket.auth = user; Socket.connect();}
    
    let selectedUser = ref({});

    const generateListUsers = (arrayUsers) => {

        arrayUsers.forEach(userData => {
            userData.self = userData.userId === Socket.id;
        });

        return arrayUsers.sort((a, b) => {
            // a sera placé avant b
            if (a.self) return -1;
            // b sera placé avant a
            if (b.self) return 1;
            // Si b est supérieur a a, b sera placé avant a
            if (a.username < b.username) return 1;
            // Si a est supérieur a b, a sera placé avant b
            if (a.username > b.username) return -1;
            // Sinon a & b sont égaux on retourne 0
            return 0;
        });
    }

    Socket.on('users', (usersOnSocket) => {
      listUsers.value = generateListUsers(usersOnSocket);
    });

    Socket.on('user connected', (userInformation) => {
      listUsers.value.push(userInformation);
      listUsers.value = generateListUsers(listUsers.value);
    });

    const selectUser = (user) => {
        selectedUser.value = user;
    };

    const sendMessage = (content) => {
      Socket.emit('private message', {
        content,
        to: selectedUser.value.userId
      });
      selectedUser.value.messages.push({
        content,
        fromSelf: true
      });
    }

    onMounted(() => {
      initSocket();
    });
    
    Socket.on("connect_error", (err) => {
      console.log('errr', err);
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    // Quand je reçois un message privé
    Socket.on('private message', ({content, from, to}) => {
      
      console.log(`receive private message De ${from} Pour ${to} Contenu ${content} . Suis-je bien le destinataire ${to === Socket.id ? 'oui' : 'non'}`);

      for (let index = 0; index < listUsers.value.length; index++) {
      
        const element = listUsers.value[index];

        // On ajoute le message envoyé à la propriété message
        if (element.userId === from) {
          element.messages.push({
            content,
            fromSelf: false
          });

          // Si l'élément courant est l'expéditeur et que je ne l'ai pas sélectionné, je set sa propriété hasNewMessages à true
          if (element !== selectedUser.value) {
            element.hasNewMessages = true;
          }

          break;

        }

      }

    });

    return { listUsers, selectUser, selectedUser, sendMessage };
  },
  components: {
    Aside,
    Form
  }
}
</script>
