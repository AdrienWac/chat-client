import UserService from '../services/user.service';

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

export const userStoreModule = {
    namespaced: true,
    state: () => ({
        user: userFromLocalStorage ? userFromLocalStorage : null
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
            console.log('laaaaa Module.actiions.create');
            const user = await UserService.createUser(request);

            localStorage.setItem('user', JSON.stringify(user));

            commit('SET_USER', user);

            return user;

        }
    },
    getters: {
        username: () => {
            if (state?.user?.username) {
                return state.user.username;
            }
            return null;
        }
    }
};