<template>
  <div class="chat-container">
    <ThreadAppBar />

    <div class="messages-container">
      <MessageBubble
        v-for="(message, index) in messages"
        :key="index"
        v-bind="message"
      />
    </div>

    <div class="message-field-container">
      <v-textarea 
        class="send-message"
        prepend-inner-icon="mdi-send"
        label="send message"
        variant="solo"
        density="compact"
        bg-color="indigo-lighten-3"
        rounded="lg"
        rows="1" 
        auto-grow 
        clearable 
        hide-details="auto"
        max-rows="4"
      >
      </v-textarea>
    </div>
  </div>
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
  width: calc(100% - 16px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-inline: 12px;
  margin-inline: 8px;
  background-color: #C5CAE9;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.messages-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  scrollbar-width: thin;
  padding: 10px 0px 10px 10px;
  margin: 0;
  border-radius: 8px;
  border: solid 2px #9FA8DA;
  background-color: white;
}

.message-field-container {
  width: 100%;
  padding: 8px;
  background-color: #C5CAE9;
}

.send-message {
  margin: 0 22px;
}

:deep(.v-field) {
  transition: background-color 0.3s ease;
  --v-field-padding-start: 7px;
}

:deep(.v-field--active) {
  background-color: #303F9F !important; /* Your custom color */
  opacity: 1;
  transition: background-color 0.3s ease;
}

:deep(.v-field--variant-solo) {
  box-shadow: none !important;
}

:deep(.v-field--prepended) {
  padding-inline-start: 8px;
}

:deep(.v-field--active .v-field-label) {
  color: #ffffff; /* Active/focused color */
}

:deep(.v-field-label) {
  color: #1A237E; /* Inactive color */
  opacity: 1;
}

:deep(.v-field--active .v-icon.mdi-send) {
  color: #ffffff; /* Different color when focused, if desired */
}

:deep(.v-icon.mdi-send) {
  color: #1A237E; /* Your custom color */
  opacity: 1;
}
</style>