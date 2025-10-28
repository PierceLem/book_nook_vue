<template>
  <div class="chat-container" v-if="threadDetail">
    <ThreadAppBar 
      :threadDetail="threadDetail"
    />

    <div class="messages-container" ref="messagesContainer">
      <MessageBubble
        v-for="message in messages"
        :message="message"
      />
      <div class="d-flex align-center justify-center w-100 h-100" v-if="!messages || messages.length === 0">
        <span class="text-indigo">no data</span>
      </div>
    </div>

    <div class="message-field-container">
      <v-textarea 
        v-model="message"
        class="send-message"
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
        <template v-slot:prepend-inner>
          <v-btn
            color="indigo"
            rounded="sm"
            variant="plain"
            icon="mdi-send"
            density="compact"
            :disabled="!message"
            @click="sendMessage()"
          >
          </v-btn>
        </template>
      </v-textarea>
    </div>
  </div>

  <template v-if="!threadDetail">
    <div class="message-box-placeholder">
      <img :src="require('@/assets/undraw_chatting.svg')" class="placeholder-img"></img>
      <span class="text-h6 text-indigo opacity-50 mt-8">Select a Thread</span>
    </div>
  </template>
</template>

<script>
import axios from 'axios';
import MessageBubble from './MessageBubble.vue';
import ThreadAppBar from './ThreadAppBar.vue';

export default {
  name: 'MessageBox',
  
  components: {
    MessageBubble,
    ThreadAppBar,
  },

  data (){
    return {
      message: '',
    }
  },

  props: {
    messages: {
      type: Array,
      default: [],
    },
    threadDetail: {
      type: Object,
      default: {},
    }
  },

  watch: {
    messages: {
      handler() {
        // Wait until Vue has rendered the updated messages
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });
      },
      deep: true,  // ensures the watcher triggers on changes to array contents
      immediate: true, // optional: scroll if messages are already loaded
    },
    threadDetail() {
      // Whenever a new thread is selected, scroll to bottom as well
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },

  methods: {
    async sendMessage() {
      try {
        const response = await axios.post(`/thread/${this.threadDetail.id}/`, {'content': this.message});
        this.$emit('newMessage', response.data);
        this.message = '';
      } catch(error) {
        console.error(error);
      }
    }
  }
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
  padding: 12px 0px 10px 10px;
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