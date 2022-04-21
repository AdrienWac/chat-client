import { createApp } from 'vue'
import App from './App.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import router from './router'
import store from './store'
import config from './config'
import CustomError from './services/customError.service'
import BlockNotifications from './components/notification/BlockNotifications.vue'

window.CustomError = CustomError;

createApp(App)
    .component('BlockNotifications', BlockNotifications)
    .use(FloatingVue)
    .use(store)
    .use(router)
    .mount('#app');
