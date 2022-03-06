export const notificationModule = {
namespaced: true,
    state: () => ({
        // Tableau de notifications (plusieurs notifications qui peuvent s'accumuler)
        notifications: [],
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
        
        addNotification({commit}, notification) {
            commit('ADD_NOTIFICATION', notification);

        },
        
        empty({commit}) {
            commit('DELETE_NOTIFICATION');
        }

    },
    getters: {
        notifications(state) {
            return state.notifications;
        },
        notification(state, idNotification) {
            return state.notifications[idNotification];
        }
    }
};