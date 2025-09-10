<template>
  <div class="chat-container" v-if="threadId">
    <ThreadAppBar />

    <div class="messages-container">
      <MessageBubble
        v-for="(message, index) in messages"
        :key="index"
        v-bind="message"
      />
      <div class="d-flex align-center justify-center w-100 h-100" v-if="messages.length == 0">
        <span class="text-indigo">no data</span>
      </div>
    </div>

    <div class="message-field-container">
      <v-textarea 
        class="send-message"
        prepend-inner-icon="mdi-send"
        label="send message"
        variant="outlined"
        density="compact"
        color="indigo"
        base-color="indigo"
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

  <template v-if="!threadId">
    <div class="message-box-placeholder">
      <img :src="require('@/assets/undraw_chatting.svg')" class="placeholder-img"></img>
      <span class="text-h6 text-indigo opacity-50 mt-8">Select a Thread</span>
    </div>
  </template>
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
      threadId: '1',
      messages: [
        { text: "Hello! How are you?", sent: false, date: 'today', sender: 'insert username 2', type: 'text' },
        { text: "I'm doing well, thanks! How about you?", sent: true, date: 'today', sender: 'insert username 1', type: 'text' },
        { text: "I'm good too! Have you been working on anything fun lately?", sent: false, date: 'today', sender: 'insert username 2', type: 'text' },
        { text: "Yeah, I just started a new Vue project!", sent: true, date: 'today', sender: 'insert username 1', type: 'text' },
        { text: "That sounds exciting! What's the project about?", sent: false, date: 'today', sender: 'insert username 2', type: 'text' },
        { text: "It's a messaging app. Actually, you're looking at it right now. 😉", sent: true, date: 'today', sender: 'insert username 1', type: 'text' },
        { text: "Very interesting. It seems to be coming along nice!", sent: false, date: 'today', sender: 'insert username 2', type: 'text' },
        { text: "How much longer before you're done?", sent: false, date: 'today', sender: 'insert username 2', type: 'text' },
        { metadata: {
            title: 'Hop on Pop',
            authors: 'Dr. Seuss',
            description: 'Introduce children to Dr. Seuss’s wonderfully witty wordplay with this classic rhyming picture book, known as “the simplest Seuss for youngest use.” This board book edition features abridged text for the littlest reader. HOP POP We like to hop. We like to hop on top of Pop. See Red and Ned and Ted and Ed in a bed. And giggle as Pat sits on a hat and on a cat and on a bat...but a cactus? Pat must NOT sit on that! Full of short, simple words and silly rhymes, the rollicking rhythm of Hop on Pop will keep children of all ages entertained throughout. Big Bright and Early Board Books are super sturdy, simplified board book editions of classic Bright and Early and Beginner Books, available in a bigger size for smaller hands!',
            thumbnail: 'http://books.google.com/books/content?id=pTJ-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          sent: true, date: 'today', sender: 'insert username 2', type: 'book'
        }
      ],
    };
  },
}
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 136px);
  width: calc(100% - 16px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-inline: 12px;
  margin-inline: 8px;
  background-color: #E8EAF6;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.messages-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
  padding: 10px 0px 10px 10px;
  margin: 0;
  border-radius: 8px;
  background-color: white;
}

.message-field-container {
  width: 100%;
  padding: 8px;
  background-color: #E8EAF6;
}

.send-message {
  margin: 0 22px;
}

.message-box-placeholder {
  height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.placeholder-img {
  width: 90%;
  max-width: 400px;
}

:deep(.v-field) {
  --v-field-padding-start: 7px;
}

:deep(.v-field--prepended) {
  padding-inline-start: 8px;
}

:deep(.v-field__input) {
  color: #3F51B5;
}

:deep(.v-field__clearable > .v-icon) {
  color: #3F51B5;
}

:deep(.v-field-label) {
  color: #3F51B5;
}

:deep(.v-icon.mdi-send) {
  color: #3F51B5;
}
</style>