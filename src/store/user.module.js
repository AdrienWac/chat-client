import UserService from '../services/user.service';

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

export const userStoreModule = {
    namespaced: true,
    state: userFromLocalStorage ? () => ({ userFromLocalStorage }) : () => ({}),
    mutations: {
        SET_USER(state, user) {
            Object.assign(state, user);
        },
        DELETE_USER(state) {
            state.user = {};
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

        async logout({commit}, user) {

            await UserService.logout(user);

            localStorage.removeItem('user');

            commit('DELETE_USER');

        }
    },
    getters: {
        user(state) {
            return state.userFromLocalStorage;
        },
        isTyping(state) {
            return state.userFromLocalStorage.is_typing;
        }
    }
};