import axios from "axios"

export default {
  namespaced: true,

  state: () => ({
    notifications: [],
  }),

  mutations: {
    SET_NOTIFICATIONS(state, notifs) {
      state.notifications = notifs;
    },
    REMOVE_NOTIFICATION(state, notifId) {
      state.notifications = state.notifications.filter((n) => n.id !== notifId);
    },
    ADD_NOTIFICATION(state, notif) {
      state.notifications.push(notif);
    },
    CLEAR_NOTIFICATIONS(state) {
      state.notifications = [];
    },
    REMOVE_FRIENDSHIP_NOTIFICATION(state, friendshipId) {
      state.notifications = state.notifications.filter(
        n => n.friendship !== friendshipId
      )
    },
  },

  actions: {
    async fetchNotifications({ commit }) {
      const response = await axios.get(`/notifications/`);
      commit('SET_NOTIFICATIONS', response.data);
    },

    async deleteNotification({commit}, notifId) {
      await axios.delete('/notifications/', { data: { 'id': notifId } });
      commit('REMOVE_NOTIFICATION', notifId);
    },

    async clearNotifications({commit}) {
      await axios.delete('notifications/');
      commit('CLEAR_NOTIFICATIONS');
    }
  },
}