import UserService from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));

export const userStoreModule = {
    namespaced: true,
    state: user ? user : null,
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },
    actions: {
        create({ commit }, request) {
            return UserService.createUser(request).then(user => {
                // On ajoute le user au LocalStorage 
                localStorage.setItem('user', JSON.stringify(user));
                // On met à jour le store
                commit('SET_USER', user);
                // On return le result
                return Promise.resolve(user);
            });
        }
    }
};