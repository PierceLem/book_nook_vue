<template>
  <div class="chat-container" v-if="activeThread">
    <ThreadAppBar />
    
    <div class="messages-container" ref="messagesContainer">
      <v-alert
        v-if="renameAlert"
        density="compact"
        closable
        text="Consider naming this thread."
        class="rename-alert"
        type="warning"
      >
      </v-alert>

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

  <template v-if="!activeThread">
    <div class="message-box-placeholder">
      <img :src="require('@/assets/undraw_chatting.svg')" class="placeholder-img"></img>
      <span class="text-h6 text-indigo opacity-50 mt-8">Select a Thread</span>
    </div>
  </template>
</template>

<script>
import { mapState } from "vuex";
import MessageBubble from './components/MessageBubble.vue';
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

  computed: {
    ...mapState('threadStore', ['messages', 'activeThread']),

    renameAlert() {
      return (
        this.activeThread.participants_detail.length > 2 && 
        this.activeThread.display_name === "Group chat"
      )
    }
  },

  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });
      },
      deep: true,
      immediate: true,
    },

    threadDetail() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },

  methods: {
    sendMessage() {
      this.$store.dispatch('threadStore/sendMessage', {'content': this.message});
    }
  }
}
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 136px);
  width: calc(100% - 16px);
  min-width: 450px;
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
  position: relative;
}

.rename-alert {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
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