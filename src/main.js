import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import CustomError from './services/customError.service'

console.log('API_URL', config.API_URL);
window.CustomError = CustomError;
console.log('window', window);

createApp(App).use(store).use(router).mount('#app')
