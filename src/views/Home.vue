<template>
  <div class="home">
    <Aside :room="'sqqs'" @selectionUser="selectUser"/>
    Utilisateur sélectionné : {{selectedUser.userId}}
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <form @submit.prevent="createUsername">
      <div class="form-group">
        <input v-bind="form.username" type="text" placeholder="Renseigner un nom d'utilisateur"/>
      </div>
      <button type="submit">Envoyer</button>
    </form> 
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Socket from '../socket'
import {ref, onMounted} from 'vue'
import Aside from '../components/chat/Aside.vue'


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


    let user = JSON.parse(sessionStorage.getItem('user'));

    const initSocket = () => { Socket.auth = user; Socket.connect();}
    
    let selectedUser = ref({});

    const selectUser = (user) => {
        console.log('ouioui select user', user);
        selectedUser.value = user;
    };

    onMounted(() => {
      initSocket();
    });
    
    Socket.on("connect_error", (err) => {
      console.log('errr', err);
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    return { selectUser, selectedUser };
  },
  components: {
    HelloWorld,
    Aside
  }
}
</script>
