import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: {},
    isAuthenticated: false,
    token: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    setUser(state, userData) {
      state.user = userData;
    },
    removeUser(state) {
      state.user = {};
    },
    updateAvatar(state, newAvatarUrl) {
      state.user = {
        ...state.user,
        avatar: newAvatarUrl,
      };
    },
  },
  actions: {
    async initializeStore({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        console.log('token exists');
        commit("setToken", token);
        axios.defaults.headers.common["Authorization"] = "Token " + token;

        try {
          const response = await axios.get("/api/v1/users/me/");
          commit("setUser", response.data);
        } catch (error) {
          commit("removeToken");
          commit("removeUser");
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("token");
        }
      } else {
        commit("removeToken");
        commit("removeUser");
      }
    },

    async login({ commit }, credentials) {
      try {
        const response = await axios.post("/api/v1/token/login/", credentials);
        const token = response.data.auth_token;
        commit("setToken", token);

        const userRes = await axios.get("/api/v1/users/me/");
        commit("setUser", userRes.data);
      } catch (error) {
        commit("removeToken");
        commit("removeUser");
        throw error;
      }
    },

    async googleLogin({ commit }, idToken) {
      const response = await axios.post("/api/auth/google/", { id_token: idToken });
      const { token, user } = response.data;
      console.log(response.data);
      commit("setToken", token);
      commit("setUser", user);
    },

    async logout({ commit }) {
      try {
        await axios.post("/api/v1/token/logout/");
      } catch (e) {
      } finally {
        commit("removeToken");
        commit("removeUser");
      }
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
