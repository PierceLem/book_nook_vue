import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: {
      username: "",
    },
    isAuthenticated: false,
    token: "",
  },
  mutations: {
    initializeStore(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        axios.defaults.headers.common["Authorization"] = "Token " + token;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, token) {
      commit("setToken", token);
    },
    logout({ commit }) {
      commit("removeToken");
      localStorage.removeItem("token");
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    getUsername(state) {
      return state.user.username;
    },
  },
};
