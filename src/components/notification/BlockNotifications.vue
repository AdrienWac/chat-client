<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import Notification from './Notification.vue'
  
  const store = useStore();

  const notifications = computed(() => { return store.getters['notification/all']});
  
</script>

<template>
    <div class="box-notifications">
      <Notification v-for="notification in notifications" :notification="notification" />
    </div>
</template>

<style scoped lang="scss">
  @import '../../assets/scss/notification.scss';
</style>
