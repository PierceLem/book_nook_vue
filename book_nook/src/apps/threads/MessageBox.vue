<template>
  <div class="chat-container" v-if="activeThread">
    <ThreadAppBar />
    
    <div class="messages-wrapper">
      <div 
        class="messages-container" 
        ref="messagesContainer"
        @scroll="onScroll"
      >
        <MessageBubble
          v-for="message in messages"
          :key="message.id"
          :ref="`message-${message.id}`"
          :message="message"
          @message-read="onMessageRead"
        />
        
        <div class="d-flex align-center justify-center w-100 h-100" v-if="!messages || messages.length === 0">
          <span class="text-indigo">no data</span>
        </div>
      </div>

      <div class="active-users" v-if="activeUsersFiltered?.length">
        <v-badge
          v-for="user in activeUsersFiltered"
          location="top right"
          color="success"
          offset-y="5"
          dot
        >
          <v-avatar
            :image="user.avatar"
            size="25"
            class="my-2"
          ></v-avatar>
        </v-badge>
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

  data() {
    return {
      savedScrollTop: 0,
      messageRefs: {},
      message: '',
      hasScrolled: false,
    }
  },

  activated() {
    this.$nextTick(() => {
      const el = this.$refs.messagesContainer
      if (!el) return

      el.scrollTop = this.savedScrollTop
    })
  },

  watch: {
    activeThread: {
      handler() {
        this.hasScrolled = false;
      }
    },

    'messages.length': {
      handler(newLength) {
        if (newLength && !this.hasScrolled) {
          this.$nextTick(() => {
            this.scrollToBookmark();
            this.hasScrolled = true;
          });
        }
      }
    }
  },

  computed: {
    ...mapState('threadStore', ['messages', 'activeThread', 'activeUsers']),

    activeUsersFiltered() {
      const currentUserId = this.$store.state.auth.user.id
      return this.activeUsers.filter(u => u.id !== currentUserId)
    }
  },

  methods: {
    onScroll() {
      this.savedScrollTop =
        this.$refs.messagesContainer.scrollTop
    },

    sendMessage() {
      this.$store.dispatch('threadStore/sendMessage', {'content': this.message});
      this.message = '';
    },

    onMessageRead(messageId) {
      this.$store.dispatch('threadStore/updateReadPosition', messageId);
    },

    scrollToBookmark() {
      const bookmarkedMessage = this.$store.getters['threadStore/getBookmark'];

      if (bookmarkedMessage) {
        const el = this.$refs[`message-${bookmarkedMessage.id}`]?.[0]?.$el;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        const container = this.$refs.messagesContainer;
        if (container) container.scrollTop = container.scrollHeight;
      }
    },
  }
}
</script>

<style scoped>
.chat-container {
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 8px;
}

.messages-wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  padding-inline: 12px;
  background-color: #E8EAF6;
}

.messages-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
  padding: 12px 0px 10px 10px;
  background-color: white;
  position: relative;
  border-radius: 8px;
}

.active-users {
  display: flex;
  margin-left: 4px;
  flex-direction: column;
  align-items: center;
  width: 44px;
  flex-shrink: 0;
  overflow-y: auto;
  scrollbar-width: none;
  background-color: white;
  border-left: 1px solid #E8EAF6;
  padding: 8px 0;
  border-radius: 8px;
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
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
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