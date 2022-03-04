

export const errorModule = {
    namespaced: true,
    state: () => ({
        // Tableau d'errors (plusieurs error possible pour une même action)
        errors: [],
    }),
    mutations: {
        ADD_ERROR(state, error) {
            state.errors.push(error);
        },
        DELETE_ERROR(state, errorId) {


        },
        DELETE_ALL(state) {
            state.errors = [];
        }
    },
    actions: {
        
        addError({commit}, error) {
            commit('ADD_ERROR', error);

        }

    },
    getters: {
        errors(state) {
            return state.errors;
        },
        error(state, idError) {
            return state.errors[idError];
        }
    }
};


function formatListUsers(arrayUsers, currentUSer) {

    arrayUsers.forEach(userData => {
        userData.self = userData.id === currentUSer.id;
        userData.hasNewMessages = 0;
        userData.messages = [];
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