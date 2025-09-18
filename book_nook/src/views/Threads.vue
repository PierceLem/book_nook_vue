<template>
  <ThreadList />
  <MessageBox />
</template>

<script>
import ThreadList from '@/components/ThreadList.vue';
import MessageBox from '@/components/MessageBox.vue';

export default {
  name: "Chat",
  components: {
    ThreadList,
    MessageBox,
  },  
};
</script>