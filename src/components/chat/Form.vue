<template>
  
  <div>
    
    <form @submit.prevent="onSubmit" class="form">
      <textarea v-model="content" placeholder="Your message..." class="input" />
      <button :disabled="!isValid" class="send-button">Send</button>
    </form>

  </div>

</template>

<script>

import { ref, computed } from 'vue';

export default {
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