export const notificationModule = {
namespaced: true,
    state: () => ({
        // Tableau de notifications (plusieurs notifications qui peuvent s'accumuler)
        notifications: [
            { code: 201, type: 'success', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt obcaecati cumque tempore nisi, iste pariatur fuga voluptates saepe cum excepturi earum placeat tenetur odit neque odio alias dolor eius.', 'id': 1 },
            { code: 201, type: 'success', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nesciunt obcaecati cumque tempore nisi, iste pariatur fuga voluptates saepe cum excepturi earum placeat tenetur odit neque odio alias dolor eius.', 'id': 1 },
            { code: 201, type: 'danger', message: 'Message notifications #2', 'id': 2 }
        ],
    }),
    mutations: {
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification);
        },
        DELETE_NOTIFICATION(state, notificationId) {

        },
        DELETE_ALL(state) {
            
            state.notifications = [];
        }
    },
    actions: {
        
        add({commit}, notification) {
            commit('ADD_NOTIFICATION', notification);

        },
        
        empty({commit}) {
            commit('DELETE_ALL');
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