<script setup>
import { ref } from 'vue'
import Hamburger from '../svg/Hamburger.vue'

const count = ref(0)
</script>

<template>
  <header>
        <div>
            <button><Hamburger :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="24" width="24" /></button>
        </div>
        <slot name="central">
            <p class="paragraph__title">Le chaat'</p>
        </slot>
        <div>
            <button><Hamburger :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="24" width="24" /></button>
        </div>
  </header>
</template>

<style scoped lang="scss">

</style>