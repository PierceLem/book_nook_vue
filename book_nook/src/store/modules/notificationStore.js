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
      state.notifications = null;
    }
  },

  actions: {
    async fetchNotifications({ commit }) {
      const response = await axios.get(`/notifications/`);
      commit('SET_NOTIFICATIONS', response.data);
    },
    
  },
}