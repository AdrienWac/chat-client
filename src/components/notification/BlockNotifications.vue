<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import Notification from './Notification.vue'
  
  const store = useStore();

  const notifications = computed(() => { return store.getters['notification/all']});

  function close(notif) {
    store.dispatch('notification/delete', notif.id);
  }
  
</script>

<template>
    <div class="box-notifications">
      <Notification v-for="notification in notifications" :notification="notification" @close="close" />
    </div>
</template>

<style scoped lang="scss">
  .box-notifications { position: fixed; bottom: 0; right: 0; width: 33%; z-index: 1000; }
</style>
