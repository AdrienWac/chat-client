<script setup>
  import { ref, computed } from 'vue'
  import { useStore, mapGetters } from 'vuex'
  
  const store = useStore();

  // let displayStatus  = ref()
  
  const notifications = computed(() => { return store.getters['notification/all']});

  const count = ref(0)
  
</script>

<template>
  <div class="box-notifications">
      <div v-for="notification in notifications" class="notification" :data-type="`${notification.type}`" >
          <p>{{notification.message}}</p>
          <button>X</button>
      </div>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/scss/notification.scss';
</style>
