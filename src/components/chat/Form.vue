<template>
  
  <div>
    
    <form @submit.prevent="onSubmit" class="form">
      <textarea v-model="content" placeholder="Your message..." class="input" />
      <button :disabled="!isValid" class="send-button">
        <PaperPlane :stroke="{color: 'transparent', width:3}" :fill="'#fff'" height="24" width="24" />
      </button>
    </form>

  </div>

</template>

<script>

import { ref, computed } from 'vue';
import PaperPlane from '../svg/PaperPlane.vue'

export default {
    components: {
      PaperPlane
    },
    setup(props, context) {

        let content = ref('');
        
        let isValid = computed(() => content.value.length > 0);

        const onSubmit = () => {
            context.emit('sendMessage', content.value);
            content.value = '';
        }

        return {content, isValid, onSubmit};   
    }
}
</script>

<style scoped lang="scss">
button{display:flex; flex-direction: row;align-items: center;justify-content: center;}
</style>