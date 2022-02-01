import UserService from '../services/user.service';

const userFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));

export const userStoreModule = {
    namespaced: true,
    state: userFromSessionStorage ? () => ({ userFromSessionStorage }) : () => ({}),
    mutations: {
        SET_USER(state, user) {
            Object.assign(state, user);
        }
    },
    actions: {
        async create({ commit }, request) {

            const user = await UserService.createUser(request);

            sessionStorage.setItem('user', JSON.stringify(user));

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