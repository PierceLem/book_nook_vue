export default {
  namespaced: true,
  state: {
    navDrawer: true,
  },
  mutations: {
    TOGGLE_DRAWER(state) {
      state.navDrawer = !state.navDrawer;
    },
    SET_DRAWER(state, value) {
      state.navDrawer = value;
    },
  },
  actions: {
    toggleDrawer({ commit }) {
      commit("TOGGLE_DRAWER");
    },
    setDrawer({ commit }, value) {
      commit("SET_DRAWER", value);
    },
  },
  getters: {
    isNavDrawerOpen(state) {
      return state.navDrawer;
    },
  },
};
