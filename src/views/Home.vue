<template>
  <div class="home">
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

export default {
  name: 'Home',
  data: () => ({
    form: {
      username: null
    }
  }),
  components: {
    HelloWorld
  }
}
</script>
