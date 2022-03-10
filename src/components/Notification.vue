<script setup>
  import { ref, watch } from 'vue'
  import { useStore, mapGetters } from 'vuex'
  
  const store = useStore();
  
  const notifications = ref(store.getters['notification/all']);

  watch(notifications, (newValue, lastValue) => {
    console.log('Notificaiton newValue', newValue);
    console.log('Notificaiton lastValue', lastValue);
  });
  
  const count = ref(0)
  
</script>

<template>
  <div class="box-notifications">
      <div v-for="notification in notifications" class="notification" :data-type="`${notification.type}`" >
          <p>{{notification.message}}</p>
      </div>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/scss/notification.scss';
</style>
