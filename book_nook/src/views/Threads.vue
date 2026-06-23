<template>
  <ThreadList />
  <MessageBox />
</template>

<script>
import ThreadList from '@/apps/threads/ThreadList.vue';
import MessageBox from '@/apps/threads/MessageBox.vue';

export default {
  name: "Threads",

  components: {
    ThreadList,
    MessageBox,
  },

  mounted() {
    this.$store.dispatch('threadStore/fetchThreads');
  }
};
</script>