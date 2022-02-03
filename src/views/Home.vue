<template>
  <div class="home">
    <Aside :room="'sqqs'"/>
    
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
import {onMounted} from 'vue'
import Aside from '../components/chat/Aside.vue'


export default {
  name: 'Home',
  data: () => ({
    form: {
      username: null
    }
  }),
  setup() {
    
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user.username);

    const initSocket = () => { Socket.auth = user; Socket.connect();console.log('init Socket', Socket.id) }
    
    onMounted(() => {
      initSocket();
    });
    
    Socket.on("connect_error", (err) => {
      console.log('errr', err);
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    return { name };
  },
  components: {
    HelloWorld,
    Aside
  }
}
</script>
