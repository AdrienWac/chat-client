import UserService from '../services/user.service';

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

export const userStoreModule = {
    namespaced: true,
    state: userFromLocalStorage ? () => ({ userFromLocalStorage }) : () => ({}),
    mutations: {
        SET_USER(state, user) {
            Object.assign(state, user);
        }
    },
    actions: {
        async create({ commit }, request) {

            const user = await UserService.createUser(request);

            localStorage.setItem('user', JSON.stringify(user));

            commit('SET_USER', user);

            return user;

        }
    },
    getters: {
        user(state) {
            return state;
        }
    }
};