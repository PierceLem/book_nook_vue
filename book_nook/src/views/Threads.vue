<template>
  <ThreadList
    @fetch-thread="fetchMessages"
    @new-thread="addNewThread"
    :threads="threadList"
  />

  <MessageBox
    :messages="messages"
    :threadDetail="threadDetail"
  />
</template>

<script>
import { connectToThread } from "@/sockets/threadSocket";
import axios from 'axios';
import ThreadList from '@/apps/threads/ThreadList.vue';
import MessageBox from '@/apps/threads/MessageBox.vue';

export default {
  name: "Chat",

  components: {
    ThreadList,
    MessageBox,
  },

  data() {
    return {
      messages: [],
      threadDetail: null,
      threadList: [],
      socket: null,
    }
  },

  mounted() {
    this.fetchThreads();
  },

  beforeUnmount() {
    if (this.socket) this.socket.close();
  },

  provide() {
    return {
      changeThreadName: this.changeThreadName,
      editThreadParticipants: this.editThreadParticipants,
      addNewMessage: this.addNewMessage,
      removeThread: this.removeThread,
    }
  },

  methods: {
    async fetchMessages(thread) {
      try {
        if (this.socket) {
          this.socket.close();
          this.socket = null;
        }

        this.threadDetail = thread;

        const response = await axios.get(`/thread/${thread.id}`);
        this.messages = response.data;

        this.socket = connectToThread(thread.id, (message) => {
          this.messages.push(message);
        });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchThreads() {
      try {
        const response = await axios.get('/threads/');
        this.threadList = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    addNewThread(threadData) {
      this.threadList.push(threadData);
    },

    addNewMessage(message) {
      this.messages.push(message);
    },

    changeThreadName(newName) {
      this.threadDetail.display_name = newName
    },

    editThreadParticipants(editedThreadData) {
      const index = this.threadList.findIndex(t => t.id === editedThreadData.id);
      if (index !== -1) {
        this.threadList.splice(index, 1, editedThreadData)
      }
      this.threadDetail = editedThreadData;
    },

    removeThread(threadId) {
      const index = this.threadList.findIndex(t => t.id === threadId);
      if (index !== -1) {
        this.threadList.splice(index, 1)
      }
      this.threadDetail = null;
    }
  }
};
</script>