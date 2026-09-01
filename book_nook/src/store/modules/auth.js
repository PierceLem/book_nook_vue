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
  },

  actions: {
    async initializeUser({ commit, dispatch }) {
      try {
        const response = await axios.get("/api/v1/users/me/");

        commit("setUser", response.data);

        await dispatch(
          "social/fetchFriends",
          response.data.id,
          { root: true }
        );

        await dispatch(
          "social/setSocket",
          response.data.id,
          { root: true }
        );

      } catch (error) {
        commit("removeToken");
        commit("removeUser");
        throw error;
      }
    },

    async initializeStore({ commit, dispatch }) {
      const token = localStorage.getItem("token");

      if (!token) {
        commit("removeToken");
        commit("removeUser");
        return;
      }

      commit("setToken", token);

      try {
        await dispatch("initializeUser");
      } catch (error) {
        commit("removeToken");
        commit("removeUser");
      }
    },

    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post("/api/v1/token/login/", credentials);
        const token = response.data.auth_token;

        commit("setToken", token);

        await dispatch("initializeUser");
      } catch (error) {
        commit("removeToken");
        commit("removeUser");
        throw error;
      }
    },

    async googleLogin({ commit, dispatch }, idToken) {
      const response = await axios.post("/api/auth/google/", { id_token: idToken });
      const { token, user } = response.data;

      commit("setToken", token);
      commit("setUser", user);

      await dispatch("initializeUser");
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

    async updateProfile({ commit, dispatch }, profileData) {
      console.log("Updating profile with data:", profileData);
      try {
        const response = await axios.patch("/update-profile/", profileData);
        commit("setUser", response.data);
      } catch (error) {
        console.error("Error updating profile:", error);
        dispatch('ui/showSnackbar', {
          subject: 'Failed to update profile pic',
          content: error.response.data,
          icon: 'mdi-close',
          color: 'red',
        }, { root: true })
      }
    }
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
