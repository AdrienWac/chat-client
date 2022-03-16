<script setup>

  import { onMounted, defineEmits } from 'vue';
  import { useStore } from 'vuex'

  const store = useStore();

  const emit = defineEmits(['close']); 

  const props = defineProps({
    notification: Object
  })

  onMounted(() => {
    
    // TODO Trouver une autre solution pour le timer de cloture d'une notifcation
    // Le dispatch au store de notif pour supprimer la notif fait bugger quand il y a trop de notif dans le store.
    // Comme si le dispatch était envoyé dans l'event loop pour pas bloquer le call stack 
    // Mais que lors de son passage la notification passé en attribut n'est pas la bonne 

    // let start = 5;

    // const interval = setInterval(() => {

    //   start -= 1;
    //   console.log(`${start} => ${props.notification.id}`);

    //   if (start == 0) {
    //     clearInterval(interval);
    //     emit('close', props.notification);
    //     // close(interval);
    //   }

    // }, 1000);
  });

  

  const timer = () => {
    
    

  }

  function close(__interval) {
    emit('close', props.notification);
    if (__interval) {
      clearInterval(__interval);
    }
  }

</script>

<template>
    <div class="notification" :data-type="`${notification.type}`" >
        <p>{{notification.message}}</p>
        <button @click="close">X</button>
    </div>
</template>

<style scoped lang="scss">
  @import '../../assets/scss/notification.scss';
</style>
