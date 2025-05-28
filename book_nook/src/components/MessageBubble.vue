<template>
  <v-container 
    class="bubble-container px-2 py-0" 
    :class="sent ? 'align-end' : 'align-start'"
  >
    <v-card 
      v-if="type === 'text'"
      rounded="lg" 
      variant="tonal"
      :color="sent ? 'indigo' : 'teal'"
      class="pa-0 message-card" 
      :class="sent ? 'ml-0' : 'ml-2 pl-3'"
      position="relative"
      max-width="75%"
      :text="text"
    >
      <v-tooltip location="right" offset="-8px" transition="fade-transition" class="username-tooltip">
        <template v-slot:activator="{ props }">
          <v-avatar 
            v-if="!sent"
            v-bind="props"
            class="message-avatar custom-avatar" 
            size="40px" 
            image="https://randomuser.me/api/portraits/women/85.jpg"
          >
          </v-avatar>
        </template>
        <span class="text-caption">{{ sender }}</span>
      </v-tooltip>
    </v-card>

    <v-card
      v-if="type === 'book'"
      height="175px"
      :width="smAndDown ? '100%' : '75%'"
      rounded="lg" 
      variant="flat"
      class="d-flex flex-row book-card-border message-card"
      :class="sent ? 'ml-0 sent-color-scheme' : 'ml-2 received-color-scheme'"
      position="relative"
    >
      <v-tooltip location="right" offset="-8px" transition="fade-transition" class="username-tooltip">
        <template v-slot:activator="{ props }">
          <v-avatar 
            v-if="!sent"
            v-bind="props"
            class="message-avatar custom-avatar" 
            size="40px" 
            image="https://randomuser.me/api/portraits/women/85.jpg"
          >
          </v-avatar>
        </template>
        <span class="text-caption">{{ sender }}</span>
      </v-tooltip>

      <img :src="metadata.thumbnail" alt="" min-height="100%" :class="sent ? 'indigo-book-thumbnail' : 'teal-book-thumbnail'">

      <div class="d-flex flex-column align-start flex-grow-1 pl-1">
        <h4 :class="sent ? 'text-indigo' : 'text-teal'">{{ metadata.title }}</h4>
        <h5 :class="sent ? 'text-indigo' : 'text-teal'" style="opacity: 0.75;">{{ metadata.authors }}</h5>
        <v-divider :color="sent ? 'indigo' : 'teal'" opacity="0.25" class="w-100"></v-divider>
        <p class="book-desc" :class="sent ? 'indigo-scroll' : 'teal-scroll'">{{ metadata.description }}</p>
      </div>
    </v-card>

    <span 
      class="message-date" 
      :class="sent ? 'ml-0' : 'ml-2'"
    >
      {{ date }}
    </span>
  </v-container>
</template>

<script>
import { useDisplay } from 'vuetify/lib/framework.mjs';

export default {
  name: "MessageBubble",

  props: {
    text: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    sent: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },

  setup() {
    const { smAndDown } = useDisplay();
    return { smAndDown };
  },
};
</script>

<style scoped>
.bubble-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-date {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.667;
  letter-spacing: 0.0333333333em;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.message-card {
  overflow: visible;
  z-index: 2;
}

.message-card:hover + .message-date {
  opacity: 1;
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

.message-avatar {
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

.username-tooltip::v-deep(.v-overlay__content) {
  padding: 0px 10px;
}

.username-tooltip::v-deep(.v-overlay__content) {
  transform: translateY(-26px);
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