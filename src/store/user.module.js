import UserService from '../services/user.service';

const userFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));

export const userStoreModule = {
    namespaced: true,
    state: () => ({
        user: userFromSessionStorage ? userFromSessionStorage : null
    }),
    mutations: {
        SET_USER(state, user) {
            if (state ) {
                state.user = user;
            } else {
                state = user;
            }
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
    getters: {}
};