<template>
  <v-container class="chat-container" min-width="100%">
    <v-app-bar 
      elevation="0" 
      border="sm" 
      class="pl-2"
    >
      <template v-slot:append>
        <v-tooltip location="left">
          <template v-slot:activator="{ props }">
            <v-btn 
              icon 
              variant="plain" 
              class="ml-4"
              v-bind="props"
            >
              <v-icon size="large">mdi-account-edit-outline</v-icon>
              <EditThread />
            </v-btn>
          </template>

          <span class="text-caption">edit thread</span>
        </v-tooltip>
      </template>
      
      <template v-slot:prepend>
        <v-menu open-on-hover open-delay="10" close-delay="10">
          <template v-slot:activator="{ props }">
            <v-avatar 
              variant="elevated" 
              color="blue-grey-darken-3" 
              size="46"
              v-bind="props"
            >
              <v-icon 
                size="large" 
                color="white"
              >
                mdi-account-group
              </v-icon>
            </v-avatar>
          </template>

          <v-list density="compact" class="pa-0">
            <template v-for="n in 3" :key="n">
              <v-list-item
                class="participant-list mx-2 pa-0"
              >
                <template v-slot:prepend>
                  <v-avatar
                    image="https://randomuser.me/api/portraits/women/85.jpg"
                    size="22px"
                  >
                  </v-avatar>
                </template>

                <template v-slot:title>
                  <span class="text-body-2">Insert username here</span>
                </template>
              </v-list-item>

              <v-divider class="ml-9" v-if="n < 3"></v-divider>
            </template>
          </v-list>
        </v-menu>

        <v-container class="d-flex flex-column pl-2">
          <div>
            <v-btn 
              variant="text" 
              icon
              height="25px"
              width="25px"
              size="x-small" 
              class="mr-1"
              @click="toggleMenu"
            >
              <v-icon>mdi-pencil</v-icon>

              <v-tooltip 
                :open-on-hover="!menuState"
                location="bottom" 
                activator="parent" 
              >
                <span class="text-caption">edit thread name</span>
              </v-tooltip>

              <ThreadRename @menuStateChange="toggleMenu" />
            </v-btn>

            <span class="text-body-1">Group Chat</span>
          </div>

          <span class="text-caption text-grey-darken-1 pl-2">Last active 3 hrs ago</span>
        </v-container>
      </template>
    </v-app-bar>

    <v-container class="messages-container" min-width="100%">
      <MessageBubble
        v-for="(message, index) in messages"
        :key="index"
        v-bind="message"
      />
    </v-container>

    <v-container class="pa-0 ma-0" min-width="100%">
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
import EditThread from './EditThread.vue';
import ThreadRename from './ThreadRename.vue';

export default {
  name: 'MessageBox',
  
  components: {
    MessageBubble,
    EditThread,
    ThreadRename,
  },

  data() {
    return {
      menuState: false,
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

  methods: {
    toggleMenu(newState) {
      this.menuState = newState
    }
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

.participant-list::v-deep(.v-list-item__prepend) {
  width: 30px;
}

:deep(.v-list-item--density-compact) {
  min-height: 30px !important;
}

.send-message {
  margin: 0 22px;
}
</style>