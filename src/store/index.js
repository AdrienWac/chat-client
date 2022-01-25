import { createStore } from 'vuex'
import { userStoreModule } from './user.module'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: {
      namespaced: true,
      actions: {
        create({ commit }, request) {
          console.log('laaaaa Module.actiions.create');
        }
      },
    }
  }
})
