<script setup>
  import { ref } from 'vue'
  import { useStore, mapGetters } from 'vuex'
  
  const props = defineProps({
    notification: Object
  })

  const store = useStore();

  // let displayStatus  = ref()
  const isActive = ref(true);
  
  

  const count = ref(0)

  // function close() {
    console.log('notification', props.notification.id);
  //   // Supprimer la notificaiton dans le store
  //   store.dispatch('notification/delete', props.notification.id);
  //   // Recalculer la position des autres notifications
  //   // isActive passe à false
  //   isActive.value = false;
  // }
  
</script>

<template>
    <div class="notification" :class="{active: isActive}" :data-type="`${notification.type}`" >
        <p>{{notification.message}}</p>
        <button @click="$emit('close')">X</button>
    </div>
</template>

<style scoped lang="scss">
  @import '../../assets/scss/notification.scss';
</style>
