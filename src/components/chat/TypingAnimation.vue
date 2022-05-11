<script setup>
    import { ref, onMounted, computed } from 'vue'

    const props = defineProps({
        text: String,
        showText: {
            type: Boolean,
            default: false
        },
        size: {
          type: String,
          default: "10px"
        }
    });

     const cssProps = computed(() => {
        return {
            '--display-dots-loading': props.showText ? 'grid' : 'block',
            '--size-dots': props.size
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
$sizeDots: var(--size-dots);
$animationDuration:1s; 
$widthContainer: calc($sizeDots * 3);
$heightContainer: calc($sizeDots * 2);
.dot-loading__container {
  width: $widthContainer;
  height: $heightContainer;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.dot-loading__dot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: dotMoving $animationDuration infinite alternate-reverse;
}

.dot-loading__dot:nth-of-type(0), .dot-loading__dot:nth-of-type(0)::before {
  animation-delay: 0s;
}
.dot-loading__dot:nth-of-type(1), .dot-loading__dot:nth-of-type(1)::before {
  animation-delay: 0.5s;
}
.dot-loading__dot:nth-of-type(2), .dot-loading__dot:nth-of-type(2)::before {
  animation-delay: 1s;
}
.dot-loading__dot::before {
  content: "";
  width: $sizeDots;
  height: $sizeDots;
  border-radius: 50%;
  background-color: map-get($colors, notification);
  animation : dotColor $animationDuration infinite alternate-reverse;
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

@keyframes dotColor {
  0% {
    background-color: map-get($colors, notification);
  }
  50% {
    background-color: lighten(map-get($colors, notification), 50%);
  }
  100% {
    background-color: map-get($colors, notification);
  }
}

</style>