<template>
  <v-container 
    class="bubble-container px-2 py-0" 
    :class="is_owner ? 'align-end' : 'align-start'"
  >
    <v-card 
      v-if="message.content"
      rounded="lg" 
      variant="tonal"
      :color="is_owner ? 'indigo' : 'teal'"
      class="pa-0 message-card" 
      :class="is_owner ? 'ml-0' : 'ml-2 pl-3'"
      position="relative"
      max-width="75%"
    >
      <v-card-text style="padding: 10px 16px 10px 16px;">
        {{ message.content }}
      </v-card-text>

      <v-avatar 
        v-if="!is_owner"
        class="text-message-avatar custom-avatar" 
        size="40px" 
        :image="message.sender.avatar"
      >
      </v-avatar>

      <div class="sender-username" v-if="!is_owner">
        <span class="text-teal username-text">{{ message.sender.username }}</span>
      </div>
    </v-card>

    <v-card
      v-if="message.book"
      height="175px"
      :width="smAndDown ? '100%' : '75%'"
      rounded="lg" 
      variant="flat"
      class="d-flex flex-row book-card-border message-card"
      :class="is_owner ? 'ml-0 sent-color-scheme' : 'ml-2 received-color-scheme'"
      position="relative"
    >
      <v-avatar 
        v-if="!is_owner"
        class="book-message-avatar custom-avatar" 
        size="40px" 
        :image="message.sender.avatar"
      >
      </v-avatar>

      <div class="sender-username" v-if="!is_owner">
        <span class="text-teal username-text">{{ message.sender.username }}</span>
      </div>

      <img :src="message.book.thumbnail" alt="" min-height="100%" :class="is_owner ? 'indigo-book-thumbnail' : 'teal-book-thumbnail'">

      <div class="d-flex flex-column align-start flex-grow-1 pl-1 pt-1">
        <h4 :class="is_owner ? 'text-indigo' : 'text-teal'">{{ message.book.title }}</h4>
        <h5 :class="is_owner ? 'text-indigo' : 'text-teal'" style="opacity: 0.75;">{{ message.book.authors.join(', ') }}</h5>
        <v-divider :color="is_owner ? 'indigo' : 'teal'" opacity="0.25" class="w-100 mt-1"></v-divider>
        <p class="book-desc" :class="is_owner ? 'indigo-scroll' : 'teal-scroll'">{{ message.book.description }}</p>
      </div>
    </v-card>

    <div 
      v-if="message.thread_update"
      class="d-flex flex-row align-center justify-center w-100 update-message"
    >
      <v-divider class="flex-grow-1"></v-divider>
        <span class="text-caption flex-shrink-0 opacity-50">{{ message.thread_update }}</span>
      <v-divider class="flex-grow-1"></v-divider>
    </div>

    <span 
      class="message-date mb-1" 
      :class="is_owner ? 'ml-0' : 'ml-2'"
    >
      {{ formatDate(message.created_at, now) }}
    </span>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { formatDate } from '@/utils/dateUtils';

export default {
  name: "MessageBubble",

  props: {
    message: {
      type: Object,
    }
  },

  setup() {
    const { smAndDown } = useDisplay();
    return { smAndDown };
  },

  methods: {
    formatDate
  },

  computed: {
    ...mapState('ui', ['now']),

    is_owner() {
      const currentUser = this.$store.state.auth.user;
      return currentUser?.id === this.message.sender?.id;
    }
  }
};
</script>

<style scoped>
.bubble-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-card {
  overflow: visible;
  z-index: 2;
}

.update-message:hover + .message-date {
  opacity: 0.5;
}

.message-card:hover + .message-date {
  opacity: 0.5;
}

.message-card:hover .sender-username {
  opacity: 0.5;
}

.message-date {
  font-size: 0.6rem;
  font-weight: 400;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sender-username {
  background: white;
  padding-inline: 4px;
  border-radius: 4px;
  border: solid 2px #E0F2F1;
  position: absolute;
  top: -10px;
  left: 15px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px; 

  opacity: 0;
  transition: opacity 0.3s ease; 
}

.username-text {
  line-height: 8px;
  font-size: x-small;
}

.book-card-border {
  border: solid 2px;
}

.sent-color-scheme {
  border-color: #C5CAE9;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.received-color-scheme {
  border-color: #B2DFDB;
  scrollbar-color: rgba(0, 150, 136, 0.5) transparent;
}

.indigo-book-thumbnail {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-right: solid 2px #C5CAE9;
}

.teal-book-thumbnail {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-right: solid 2px #B2DFDB;
}

.text-message-avatar {
  position: absolute;
  top: 0px;
  left: -20px;
  z-index: 3;
}

.book-message-avatar {
  position: absolute;
  top: 6px;
  left: -20px;
  z-index: 3;
}

.custom-avatar::v-deep(.v-img__img) {
  border-style: solid;
  border-width: 3px;
  border-radius: 50%;
  border-color: white;
}

.book-desc {
  padding: 6px 0px;
  padding-right: 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  font-weight: 400;
  font-size: smaller;
  line-height: 20px;
  z-index: 1001;
}

.teal-scroll {
  scrollbar-color: rgba(0, 150, 136, 0.5) transparent;
}

.indigo-scroll {
  scrollbar-color: rgba(26, 35, 126, 0.5) transparent;
}
</style>