import axios from "axios";
import { connectToThread } from "@/sockets/threadSocket";

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

    addNewThread({ commit }, thread) {
      commit("ADD_THREAD", thread);
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

    sendMessage({ state }, content) {
      if (!state.socket || state.socket.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket not connected");
        return;
      }

      state.socket.send(
        JSON.stringify({
          content,
        })
      );
    },

    /* ------------------------------
       THREAD UPDATES
    ------------------------------ */

    updateThread({ commit }, updatedThread) {
      commit("UPDATE_THREAD", updatedThread);
    },

    removeThread({ commit }, threadId) {
      commit("REMOVE_THREAD", threadId);
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
};