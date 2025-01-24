<template>
  <div class="workshop">
    <v-container class="message-box">
      <v-container 
        v-for="message in messages"
        class="bubble-container pa-2" 
        :class="message.sent ? 'align-end' : 'align-start'"
      >
        <v-card 
          rounded="lg" 
          variant="tonal"
          :color="message.sent ? 'indigo' : 'teal'"
          class="pa-0 message-card" 
          :class="message.sent ? 'ml-0' : 'ml-2 pl-3'"
          position="relative"
          max-width="75%"
          :text="message.text"
        >
          <v-tooltip location="top" offset="6">
            <template v-slot:activator="{ props }">
              <v-avatar 
                v-if="!message.sent"
                v-bind="props"
                class="message-avatar custom-avatar" 
                size="40px" 
                image="https://randomuser.me/api/portraits/women/85.jpg"
              >
              </v-avatar>
            </template>
            <span class="text-caption">Username</span>
          </v-tooltip>
          
        </v-card>

        <span 
          class="message-date" 
          :class="message.sent ? 'ml-0' : 'ml-2'"
        >
          Mon 12:00
        </span>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "WorkShop",
  data() {
    return {
      messages: [
        { text: "Hello! How are you?", sent: false },
        { text: "I'm doing well, thanks! How about you?", sent: true },
        { text: "I'm good too! Have you been working on anything fun lately?", sent: false },
        { text: "Yeah, I just started a new Vue project!", sent: true },
        { text: "That sounds exciting! What's the project about?", sent: false },
        { text: "It's a messaging app. Actually, you're looking at it right now. 😉", sent: true },
      ],
    };
  },
};
</script>

<style scoped>
.workshop {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.message-box {
  width: 800px;
  height: 500px;
  overflow-y: auto;
}

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

.v-tooltip::v-deep(.v-overlay__content) {
  padding: 0px 10px;
}
</style>

