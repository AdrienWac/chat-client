import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import CustomError from './services/customError.service'
import BlockNotifications from './components/notification/BlockNotifications.vue'

window.CustomError = CustomError;

createApp(App).component('BlockNotifications', BlockNotifications).use(store).use(router).mount('#app');
