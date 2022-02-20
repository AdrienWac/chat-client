import UserService from '../services/user.service';

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

export const userStoreModule = {
    namespaced: true,
    state: userFromLocalStorage ? () => {return userFromLocalStorage} : () => ({}),
    mutations: {
        SET_USER(state, user) {
            Object.assign(state, user);
        },
        DELETE_USER(state) {
            console.log('DELETE USER', state);
            //² state.deleteProperty()
            // Object.assign(state, () => ({}));
            Object.getOwnPropertyNames(state).forEach(property => {
                delete state[property];
            });
            console.log('DELETE USER AFTER', state);
        }
    },
    actions: {
        async create({ commit }, request) {

            const user = await UserService.createUser(request);

            localStorage.setItem('user', JSON.stringify(user));

            commit('SET_USER', user);

            return user;

        },

        async login({commit}, request) {

            const user = await UserService.login(request);

            localStorage.setItem('user', JSON.stringify(user));

            commit('SET_USER', user);

            return user;

        },

        async logout({commit, state}, user) {

            localStorage.removeItem('user');

            commit('DELETE_USER');

        }
    },
    getters: {
        user(state) {
            return state;
        },
        isTyping(state) {
            return state.is_typing;
        }
    }
};