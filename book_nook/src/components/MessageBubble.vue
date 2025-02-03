<template>
  <v-container 
    class="bubble-container px-2 py-0" 
    :class="sent ? 'align-end' : 'align-start'"
  >
    <v-card 
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

    <span 
      class="message-date" 
      :class="sent ? 'ml-0' : 'ml-2'"
    >
      {{ date }}
    </span>
  </v-container>
</template>

<script>
export default {
  name: "MessageBubble",
  props: {
    text: {
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
</style>