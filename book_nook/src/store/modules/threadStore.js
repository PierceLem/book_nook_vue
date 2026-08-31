import axios from "axios";
import { connectToThread, disconnectFromThread } from "@/sockets/messageSocket";

export default {
  namespaced: true,

  state: () => ({
    threads: [],
    activeThread: null,
    activeUsers: [],
    messages: [],
    lastReadMessageId: null,
    socket: null,
  }),

  mutations: {
    SET_THREADS(state, threads) {
      state.threads = threads;
    },

    SET_SOCKET(state, socket) {
      state.socket = socket;
    },

    SET_ACTIVE_THREAD(state, thread) {
      state.activeThread = thread;
    },

    SET_ACTIVE_USERS(state, users) {
      state.activeUsers = users;
    },

    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },

    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },

    ADD_THREAD(state, thread) {
      state.threads.push(thread);
    },

    UPDATE_BOOKMARK(state, data) {
      if (data.old_message) {
        const oldIndex = state.messages.findIndex(
          (m) => m.id === data.old_message.id
        );

        if (oldIndex !== -1) {
          state.messages.splice(oldIndex, 1, data.old_message);
        };
      }

      const newIndex = state.messages.findIndex(
        (m) => m.id === data.new_message.id
      );

      if (newIndex !== -1) {
        state.messages.splice(newIndex, 1, data.new_message);
      };
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

    RECONCILE_THREAD(state, data) {
      const threadIndex = state.threads.findIndex(t => t.id === data.thread_id)

      if (threadIndex !== -1) {
        const thread = state.threads.splice(threadIndex, 1)[0]
        state.threads.unshift({ ...thread, last_active: data.last_active, hint: data.message_hint })

        if (state.activeThread && data.thread_id === state.activeThread.id) {
          state.activeThread.last_active = data.last_active
        }
      }
    },

    REMOVE_THREAD(state, threadId) {
      state.threads = state.threads.filter((t) => t.id !== threadId);
      if (state.activeThread?.id === threadId) {
        state.activeThread = null;
        state.messages = [];
      }
    },

    SET_LAST_READ_MESSAGE(state, messageId) {
      const messages = state.messages;
      const newIndex = messages.findIndex(m => m.id === messageId);
      const currentIndex = messages.findIndex(m => m.id === state.lastReadMessageId);

      if (newIndex > currentIndex) {
        state.lastReadMessageId = messageId;
      }
    }
  },

  actions: {
    async fetchThreads({ commit }) {
      const response = await axios.get("/threads/");
      commit("SET_THREADS", response.data);
    },

    async addNewThread(_, participants) {
      await axios.post('/threads/', {'participants': participants});
    },

    async selectThread({ commit, dispatch, rootState }, thread) {
      await dispatch('cleanup');

      commit("SET_ACTIVE_THREAD", thread);

      const response = await axios.get(`/thread/${thread.id}`);
      commit("SET_MESSAGES", response.data);

      const socket = connectToThread(thread.id);
      commit("SET_SOCKET", socket);
    },

    async sendMessage({ state }, message) {
      await axios.post(`/thread/${state.activeThread.id}/`, message);
    },

    async sendBook({ threadId, threadName }) {
      try {
        await axios.post(`/thread/${threadId}/`, 
          {
            book_data: {
              book_id: this.bookId,
              title: this.title,
              thumbnail: this.thumbnail,
              description: this.description,
              authors: this.authors,
            }
          }
        );
        this.$store.dispatch('ui/showSnackbar', {
          subject: 'Message Sent Successfully',
          content: 'Your book was went to ' + threadName,
          icon: 'mdi-check',
          color: 'green',
        })
      } catch(error) {
        console.error(error);
      }
    },

    updateReadPosition({ commit }, messageId) {
      commit('SET_LAST_READ_MESSAGE', messageId);
    },


    async updateThread({ state }, updatedThread) {
      await axios.patch(`/threads/${state.activeThread.id}/`, updatedThread);
    },

    async deleteThread(_, threadId) {
      await axios.delete(`/threads/${threadId}/`);
    },

    cleanup({ state, commit }) {
      disconnectFromThread(state.socket);
      commit("SET_SOCKET", null);
      commit("SET_MESSAGES", []);
      commit("SET_ACTIVE_USERS", []);
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
    },

    hasActiveThread(state) {
      return !!state.activeThread;
    },

    getBookmark(state, getters, rootState) {
      const currentUserId = rootState.auth.user.id;
      return state.messages.find(m => 
        m.bookmarks?.some(b => b.user.id === currentUserId)
      );
    },
  }
};