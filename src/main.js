import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import CustomError from './services/customError.service'
import Notification from './components/Notification.vue'

window.CustomError = CustomError;

createApp(App).component('Notification', Notification).use(store).use(router).mount('#app');
