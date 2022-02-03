<template>
  
  <div>
    
    <form @submit.prevent="onSubmit" class="form">
      <textarea v-model="input" placeholder="Your message..." class="input" />
      <button :disabled="!isValid" class="send-button">Send</button>
    </form>

  </div>

</template>

<script>

import { ref, computed } from 'vue';

export default {
    setup(props, context) {

        let input = ref('');
        
        let isValid = computed(() => input.value.length > 0);

        const onSubmit = () => {
            context.emit('sendMessage', input);
        }

        return {input, isValid};   
    }
}
</script>