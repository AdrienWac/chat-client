

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
        },
        SET_SELECTED_USER_PROPERTY(state, {propertyName, propertyValue}) {
            if (state.selectedUser.hasOwnProperty(propertyName)) {
                state.selectedUser[index][propertyName] = propertyValue;
            }
        }
    },
    actions: {
        
        generateListUsers({ commit }, arrayUsers) {
            console.log('generateListUSers', arrayUsers);
            commit('SET_ARRAY_USERS', arrayUsers);

        },

        setUserConnectedStatus({commit}, { user, status }) {
            commit('SET_USER_PROPERTY', { userId: user.id, propertyName: 'is_connected', propertyValue: status});
        },

        selectUser({ commit}, user) {
    
            commit('SET_SELECTED_USER', user);

            commit('SET_USER_PROPERTY', { userId: user.id, propertyName: 'hasNewMessages', propertyValue: 0 });

        },

        setSelectedUserConnectedStatus({ commit}, statusValue) {
            commit('SET_SELECTED_USER_PROPERTY', 'is_connected', statusValue);
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
           
            messages.push({ content: content, fromSelf: true, sender: senderUser });

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
            console.log('ICICICICI', senderUser, recipientUser);
            messages.push({ content: content, fromSelf: fromSelf, sender: senderUser});

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

        },

        receiveMessageFromBro ({commit, state}, {content, senderUser, recipientUser, fromSelf}) {

            const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

            // Extraction de la propriété message du destinataire
            let messages = [];

            for (let index = 0; index < state.arrayUsers.length; index++) {

                const element = state.arrayUsers[index];

                if (element.id === recipientUser.id) {

                    messages = state.arrayUsers[index].messages;

                    break;
                }

            }

            // J'y ajoute le nouveau message
            messages.push({ content: content, fromSelf: fromSelf, sender: senderUser });

            // Je met à jour la propriété dans le state
            commit('SET_USER_PROPERTY', { userId: recipientUser.id, propertyName: 'messages', propertyValue: messages });

            // Si le destinataire n'est pas l'utilisateur sélectionné j'incrémente hasNewMessage
            if (Object.keys(state.selectedUser).length == 0 || recipientUser.id !== state.selectedUser.id) {

                let hasNewMessageValue = 0;

                // J'extrais la propriété message du destinataire
                for (let index = 0; index < state.arrayUsers.length; index++) {
                    if (recipientUser.id === state.arrayUsers[index].id) {
                        hasNewMessageValue = state.arrayUsers[index].hasNewMessages;
                        break;
                    }
                }

                hasNewMessageValue += 1;

                commit('SET_USER_PROPERTY', { userId: recipientUser.id, propertyName: 'hasNewMessages', propertyValue: hasNewMessageValue });
            }

        },

        detectTypingMessage({commit}, {user, state: boolIsTyping}) {
            commit('SET_USER_PROPERTY', { userId: user.id, propertyName: 'is_typing', propertyValue: boolIsTyping });
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