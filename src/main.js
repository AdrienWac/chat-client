import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

console.log('API_URL', config.API_URL);

createApp(App).use(store).use(router).mount('#app')
