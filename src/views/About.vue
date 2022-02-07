<template>
  <div class="container">
    <div class="header"></div>
    <div class="main"></div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-rows: 10vh 90vh;
  // animation-duration: 1s; animation-name: displayFooter;animation-fill-mode: forwards;
  // animation: 0.7s displayFooter cubic-bezier(.86,0,.07,1) 0.4s both;;
  transition: all 10s;
}
.container--full {
  grid-template-rows: 10vh 80vh 10vh;
}
@keyframes displayFooter {
  0% {
    grid-template-rows: 10vh 90vh;
  }
  50% {
    grid-template-rows: 10vh 80vh;
  }
  100% {
    grid-template-rows: 10vh 80vh 10vh;
  }
}
.header {
  background: red;
}
.main {
  background: green;
}
.footer {
  background: yellow;
}
</style>