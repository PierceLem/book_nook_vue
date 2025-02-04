export default {
  namespaced: true,
  state: {
    navDrawer: true,
    chatDrawer: false,
  },
  mutations: {
    TOGGLE_DRAWER(state) {
      state.navDrawer = !state.navDrawer;
    },
    SET_DRAWER(state, value) {
      state.navDrawer = value;
    },
    TOGGLE_CHAT_DRAWER(state) {
      state.chatDrawer = !state.chatDrawer;
    },
    SET_CHAT_DRAWER(state, value) {
      state.chatDrawer = value;
    },
  },
  actions: {
    toggleDrawer({ commit }) {
      commit("TOGGLE_DRAWER");
    },
    setDrawer({ commit }, value) {
      commit("SET_DRAWER", value);
    },
    toggleChatDrawer({ commit }) {
      commit("TOGGLE_CHAT_DRAWER");
    },
    setChatDrawer({ commit }, value) {
      commit("SET_CHAT_DRAWER", value);
    },
  },
  getters: {
    isNavDrawerOpen(state) {
      return state.navDrawer;
    },
    isChatDrawerOpen(state) {
      return state.chatDrawer;
    },
  },
};
