<template>
  <div>
    <BlockNotifications />
    <router-view/>
  </div>
</template>
<style>
  @import './assets/reset.css';
  
  @font-face {
    font-family: "Courgette";
    src: local("Courgette"),
    url(./assets/fonts/Courgette-Regular.ttf) format("truetype");
  }
</style>