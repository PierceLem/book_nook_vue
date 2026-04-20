import axios from "axios";
import { connectToThread } from "@/sockets/messageSocket";

export default {
  namespaced: true,

  state: () => ({
    threads: [],
    activeThread: null,
    messages: [],
    socket: null,
  }),

  getters: {
    hasActiveThread(state) {
      return !!state.activeThread;
    },
  },

  mutations: {
    SET_THREADS(state, threads) {
      state.threads = threads;
    },

    ADD_THREAD(state, thread) {
      state.threads.push(thread);
    },

    SET_ACTIVE_THREAD(state, thread) {
      state.activeThread = thread;
    },

    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },

    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },

    CLEAR_MESSAGES(state) {
      state.messages = [];
    },

    SET_SOCKET(state, socket) {
      state.socket = socket;
    },

    CLEAR_SOCKET(state) {
      if (state.socket) {
        state.socket.close();
      }
      state.socket = null;
    },

    UPDATE_THREAD(state, updatedThread) {
      const index = state.threads.findIndex(
        (t) => t.id === updatedThread.id
      );

      if (index !== -1) {
        state.threads.splice(index, 1, updatedThread);
      }

      if (state.activeThread?.id === updatedThread.id) {
        state.activeThread = updatedThread;
      }
    },

    REMOVE_THREAD(state, threadId) {
      state.threads = state.threads.filter((t) => t.id !== threadId);
      if (state.activeThread?.id === threadId) {
        state.activeThread = null;
        state.messages = [];
      }
    },
  },

  actions: {
    /* ------------------------------
       THREAD LIST
    ------------------------------ */

    async fetchThreads({ commit }) {
      const response = await axios.get("/threads/");
      commit("SET_THREADS", response.data);
    },

    async addNewThread(_, participants) {
      await axios.post('/threads/', {'participants': participants});
    },

    /* ------------------------------
       THREAD SELECTION
    ------------------------------ */

    async selectThread({ state, commit }, thread) {
      // Close previous socket
      if (state.socket) {
        state.socket.close();
      }

      commit("CLEAR_MESSAGES");
      commit("SET_ACTIVE_THREAD", thread);

      // Fetch message history
      const response = await axios.get(`/thread/${thread.id}`);
      commit("SET_MESSAGES", response.data);

      // Open WebSocket for this thread
      const socket = connectToThread(thread.id, (message) => {
        commit("ADD_MESSAGE", message);
      });

      commit("SET_SOCKET", socket);
    },

    /* ------------------------------
       MESSAGING
    ------------------------------ */ 

    async sendMessage({ state }, message) {
      await axios.post(`/thread/${state.activeThread.id}/`, message);
    },

    /* ------------------------------
       THREAD UPDATES
    ------------------------------ */

    async updateThread({ state }, updatedThread) {
      await axios.patch(`/threads/${state.activeThread.id}/`, updatedThread);
    },

    async deleteThread(_, threadId) {
      await axios.delete(`/threads/${threadId}/`);
    },

    /* ------------------------------
       CLEANUP
    ------------------------------ */

    cleanup({ commit }) {
      commit("CLEAR_SOCKET");
      commit("CLEAR_MESSAGES");
      commit("SET_ACTIVE_THREAD", null);
    },
  },

  getters: {
    getThreadDisplayName: (state, getters, rootState) => (thread) => {
      const currentUserId = rootState.auth.user.id

      if (thread.name) return thread.name

      if (thread.participants_detail.length === 2) {
          const other = thread.participants_detail.find(p => p.id !== currentUserId)
          return other ? other.username : "Group Chat"
      }

      return "Group Chat"
    }
  }
};