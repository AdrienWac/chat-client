<script setup>
    import { ref, onMounted, computed } from 'vue'

    const props = defineProps({
        text: String,
        showText: {
            type: Boolean,
            default: false
        }
    });

     const cssProps = computed(() => {
        return {
            '--display-dots-loading': props.showText ? 'grid' : 'block'
        }
    });

</script>

<template>
    <div :style="cssProps" class="dot-loading__container">
        <!-- TODO Passer le nombre de dots via props et boucler sur ce nombre -->
        <span class="dot-loading__dot"></span>
        <span class="dot-loading__dot"></span>
        <span class="dot-loading__dot"></span>
    </div>
</template>

<style scoped lang="scss">
// .dots-loading {
//     display: var(--display-dots-loading);
//     grid-template-columns: 0.5fr 11.5fr;
// }

.dot-loading__container {
  width: 10%;
  height: 20px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.dot-loading__dot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: dotMoving 0.5s infinite alternate;
}
.dot-loading__dot:nth-of-type(0) {
  animation-delay: 0s;
}
.dot-loading__dot:nth-of-type(1) {
  animation-delay: 0.25s;
}
.dot-loading__dot:nth-of-type(2) {
  animation-delay: 0.5s;
}
.dot-loading__dot::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
}
@keyframes dotMoving {
  0% {
    justify-content: center;
  }
  50% {
    justify-content: start;
  }
  100% {
    justify-content: center;
  }
}

</style>