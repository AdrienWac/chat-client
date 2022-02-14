

export const chatStoreModule = {
    namespaced: true,
    state: () => ({
        // TODO refacto => passer par un Map au lieu d'un array (est-ce que ça passe pour l'affichage ?)
        arrayUsers: [],
        selectedUser: {}
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

        },
        SET_SELECTED_USER(state, user) {
            state.selectedUser = user;
        }
    },
    actions: {
        
        generateListUsers({ commit }, arrayUsers) {
            // TODO refacto => passer par un Map au lieu d'un array avec l'id en key
            const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            
            formatListUsers(arrayUsers, userFromLocalStorage);

            commit('SET_ARRAY_USERS', arrayUsers);

        },

        setUserConnectedStatus({commit}, { user, status }) {
            commit('SET_USER_PROPERTY', { userId: user.id, propertyName: 'is_connected', propertyValue: status});
        },

        selectUser({ commit, state}, user) {
    
            commit('SET_SELECTED_USER', user);

            commit('SET_USER_PROPERTY', { userId: user.id, propertyName: 'hasNewMessages', propertyValue: 0 });

        },

        sendMessage({ commit, state }, { content, senderUser, recipientUser }) {
            // TODO refacto => passer par un Map au lieu d'un array pour state.arrayUsers
            let messages = [];    

            for (let index = 0; index < state.arrayUsers.length; index++) {
                
                const element = state.arrayUsers[index];

                if (element.id === recipientUser.id) {
                    
                    messages = state.arrayUsers[index].messages;

                    break;
                } 
                
            }

            messages.push({ content: content, fromSelf: true });

            commit('SET_USER_PROPERTY', { userId: state.selectedUser.id, propertyName: 'messages', propertyValue: messages });
            

        },
        receiveMessage({commit, state}, {content, senderUser, recipientUser, fromSelf}) {

            const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            
            let messages = [];

            // J'extrais la propriété message de l'expéditeur
            for (let index = 0; index < state.arrayUsers.length; index++) {
                if (senderUser.id === state.arrayUsers[index].id) {
                    messages = state.arrayUsers[index].messages;
                    break;
                }
            }

            // J'y ajoute le nouveau message
            messages.push({ content: content, fromSelf: fromSelf});

            // Je met à jour la propriété dans le state
            commit('SET_USER_PROPERTY', { userId: senderUser.id, propertyName: 'messages', propertyValue: messages });

            // Si l'expéditeur n'est pas l'utilisateur sélectionné j'incrémente hasNewMessage
            if (Object.keys(state.selectedUser).length == 0 || senderUser.id !== state.selectedUser.id) {
                
                let hasNewMessageValue = 0;
                
                // J'extrais la propriété message de l'expéditeur
                for (let index = 0; index < state.arrayUsers.length; index++) {
                    if (senderUser.id === state.arrayUsers[index].id) {
                        hasNewMessageValue = state.arrayUsers[index].hasNewMessages;
                        break;
                    }
                }

                hasNewMessageValue += 1;
            
                commit('SET_USER_PROPERTY', { userId: senderUser.id, propertyName: 'hasNewMessages', propertyValue: hasNewMessageValue});
            }

        }
    },
    getters: {
        arrayUsers(state) {
            return state.arrayUsers;
        },
        selectedUser(state) {
            return state.selectedUser;
        } 
    }
};


function formatListUsers(arrayUsers, currentUSer) {

    arrayUsers.forEach(userData => {
        userData.self = userData.id === currentUSer.id;
        userData.isTyping = false;
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