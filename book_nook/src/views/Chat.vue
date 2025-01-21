<template>
  <ChatList />
  <MessageBox />
</template>

<script>
import ChatList from '@/components/ChatList.vue';
import MessageBox from '@/components/MessageBox.vue';

export default {
  name: "Chat",
  components: {
    ChatList,
    MessageBox,
  },  
};
</script>