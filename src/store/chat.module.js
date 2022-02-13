

export const chatStoreModule = {
    namespaced: true,
    state: () => ({
        arrayUsers: []
    }),
    mutations: {
        SET_ARRAY_USERS(state, users) {
            state.arrayUsers = users;
        },
        SET_USER_PROPERTY(state, { userId, propertyName, propertyValue}) {

            for (let index = 0; index < state.arrayUsers.length; index++) {

                const element = state.arrayUsers[index];

                if (element.id === userId) {
                    state.arrayUsers[index][propertyName] = propertyValue;
                }

            }

        }
    },
    actions: {
        
        generateListUsers({ commit }, arrayUsers) {
            
            const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            
            formatListUsers(arrayUsers, userFromLocalStorage);

            commit('SET_ARRAY_USERS', arrayUsers);

        },

        setUserConnectedStatus({commit}, { user, status }) {
            commit('SET_USER_PROPERTY', { userId: user.id, propertyName: 'is_connected', propertyValue: status});
        }
    },
    getters: {
        arrayUsers(state) {
            return state.arrayUsers;
        }
    }
};


function formatListUsers(arrayUsers, currentUSer) {

    arrayUsers.forEach(userData => {
        userData.self = userData.id === currentUSer.id;
        userData.isTyping = false;
        userData.hasNewMessages = 0;
    });

    return arrayUsers.sort((a, b) => {
        // a sera placé avant b
        if (a.self) return -1;
        // b sera placé avant a
        if (b.self) return 1;
        // Si b est supérieur a a, b sera placé avant a
        if (a.username < b.username) return 1;
        // Si a est supérieur a b, a sera placé avant b
        if (a.username > b.username) return -1;
        // Sinon a & b sont égaux on retourne 0
        return 0;
    });
}