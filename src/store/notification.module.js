export const notificationModule = {
namespaced: true,
    state: () => ({
        // Tableau de notifications (plusieurs notifications qui peuvent s'accumuler)
        notifications: [
            // { code: 201, type: 'success', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt obcaecati cumque tempore nisi, iste pariatur fuga voluptates saepe cum excepturi earum placeat tenetur odit neque odio alias dolor eius.', 'id': 3 },
            // { code: 201, type: 'success', message: 'qsqsqsqsq', 'id': 10 },
            // { code: 400, type: 'danger', message: 'Message notifications #2', 'id': 1 }
        ],
    }),
    mutations: {
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification);
        },
        DELETE_NOTIFICATION(state, notificationId) {
            state.notifications = state.notifications.filter(notification => notification.id != notificationId);
        },
        DELETE_ALL(state) {
            state.notifications = [];
        }
    },
    actions: {
        
        add({state, commit}, notification) {

            const generateUniqueId = () => {

                const arrayExistingId = state.notifications.map(notification => notification.id);

                const randomId = Math.floor(Math.random() * 100);

                if (arrayExistingId.includes(randomId)) {
                    return generateUniqueId();
                }

                return randomId;

            }

            notification.id = generateUniqueId();

            commit('ADD_NOTIFICATION', notification);
        
        },
        
        empty({commit}) {
            commit('DELETE_ALL');
        },

        delete({commit}, notificationId) {
            commit('DELETE_NOTIFICATION', notificationId);
        }

    },
    getters: {
        all(state) {
            return state.notifications;
        },
        notification(state, idNotification) {
            return state.notifications[idNotification];
        }
    }
};