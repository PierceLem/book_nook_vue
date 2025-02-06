<template>
  <v-container 
    class="chat-container" 
    min-width="100%"
  >
    <ThreadAppBar />

    <v-container 
      class="messages-container" 
      min-width="100%"
    >
      <MessageBubble
        v-for="(message, index) in messages"
        :key="index"
        v-bind="message"
      />
    </v-container>

    <v-container 
      class="pa-0 ma-0" 
      min-width="100%"
    >
      <v-textarea 
        class="send-message"
        rows="1" 
        auto-grow 
        clearable 
        max-rows="4"
      >
        <template v-slot:prepend-inner>
          <v-btn 
            icon="mdi-send" 
            variant="text" 
            size="small"
          >
          </v-btn>
        </template>
      </v-textarea>
    </v-container>   
  </v-container>
</template>

<script>
import MessageBubble from './MessageBubble.vue';
import ThreadAppBar from './ThreadAppBar.vue';

export default {
  name: 'MessageBox',
  
  components: {
    MessageBubble,
    ThreadAppBar,
  },

  data() {
    return {
      messages: [
        { text: "Hello! How are you?", sent: false, date: 'today', sender: 'insert username 2' },
        { text: "I'm doing well, thanks! How about you?", sent: true, date: 'today', sender: 'insert username 1' },
        { text: "I'm good too! Have you been working on anything fun lately?", sent: false, date: 'today', sender: 'insert username 2' },
        { text: "Yeah, I just started a new Vue project!", sent: true, date: 'today', sender: 'insert username 1' },
        { text: "That sounds exciting! What's the project about?", sent: false, date: 'today', sender: 'insert username 2' },
        { text: "It's a messaging app. Actually, you're looking at it right now. 😉", sent: true, date: 'today', sender: 'insert username 1' },
        { text: "Very interesting. It seems to be coming along nice!", sent: false, date: 'today', sender: 'insert username 2' },
        { text: "How much longer before you're done?", sent: false, date: 'today', sender: 'insert username 2' },
      ],
    };
  },
}
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 128px);
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.messages-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  scrollbar-width: thin;
  padding-inline: 20px;
  margin: 0;
}

.send-message {
  margin: 0 22px;
}
</style>