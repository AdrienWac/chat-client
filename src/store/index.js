import { createStore } from 'vuex'
import { userStoreModule } from './user.module'
import { chatStoreModule } from './chat.module'
import { notificationModule } from './notification.module'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userStoreModule,
    chat: chatStoreModule,
    notification: notificationModule
  }
})
