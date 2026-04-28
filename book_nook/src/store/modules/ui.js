export default {
  namespaced: true,
  
  state: {
    now: new Date(),
    navDrawer: true,
    chatDrawer: true,
    snackbar: {
      visible: false,
      subject: '',
      content: '',
      icon: '',
      color: '',
    },
  },

  mutations: {
    UPDATE_NOW(state) {
      state.now = new Date()
    },
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
    SHOW_SNACKBAR(state, { 
      subject, 
      content, 
      color = 'info', 
      icon = 'mdi-information' 
    }) {
      state.snackbar.visible = true
      state.snackbar.subject = subject
      state.snackbar.content = content
      state.snackbar.color = color
      state.snackbar.icon = icon
    },
    HIDE_SNACKBAR(state) {
      state.snackbar.visible = false
      state.snackbar.message = ''
    },
  },

  actions: {
    startClock({ commit }) {
      setInterval(() => {
        commit("UPDATE_NOW")
      }, 60000)
    },

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

    showSnackbar({ commit }, payload) {
      commit('SHOW_SNACKBAR', payload)
      setTimeout(() => commit('HIDE_SNACKBAR'), 5000)
    }
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
