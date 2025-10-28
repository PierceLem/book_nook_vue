<template>
  <ThreadList 
    @fetch-thread="fetchMessages"
    @new-thread="addNewThread"
    :threads="threadList"
  />

  <MessageBox
    :messages="messages"
    :threadDetail="threadDetail"
    @new-message="addNewMessage"
  />
</template>

<script>
import axios from 'axios';
import ThreadList from '@/components/ThreadList.vue';
import MessageBox from '@/components/MessageBox.vue';

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
    }
  },

  mounted() {
    this.fetchThreads();
  },

  methods: {
    async fetchMessages(thread) {
      try {
        const response = await axios.get(`/thread/${thread.id}`);
        console.log(response.data);
        this.messages = response.data;
        this.threadDetail = thread
      } catch(error) {
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
    }
  }
};
</script>