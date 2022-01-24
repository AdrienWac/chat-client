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
        async create({ commit }, request) {

            const user = await UserService.createUser(request);

            localStorage.setItem('user', JSON.stringify(user));

            commit('SET_USER', user);

            return user;

        }
    }
};