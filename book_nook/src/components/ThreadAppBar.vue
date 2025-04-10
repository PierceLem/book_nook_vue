<template>
  <v-app-bar 
    elevation="0" 
    class="pl-0 border-b"
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
            <v-icon size="large"
              >mdi-account-edit-outline
            </v-icon>

            <EditThread />
          </v-btn>
        </template>

        <span class="text-caption">
          edit thread
        </span>
      </v-tooltip>
    </template>
    
    <template v-slot:prepend>
      <v-btn 
        variant="tonal" 
        width="36-px" 
        height="36-px" 
        rounded="0"
        class="toggle-chat-list"
        @click="toggleChatDrawer"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>

        <v-tooltip 
          location="bottom" 
          activator="parent"
        >
          <span class="text-caption">
            thread list
          </span>
        </v-tooltip>
      </v-btn>

      <ThreadParticipants />

      <v-container class="d-flex flex-column pl-2">
        <div>
          <v-btn 
            variant="text" 
            icon
            height="25px"
            width="25px"
            size="x-small" 
            @click="toggleMenu"
          >
            <v-icon>mdi-pencil</v-icon>

            <v-tooltip 
              :open-on-hover="!menuState"
              location="bottom" 
              activator="parent" 
            >
              <span class="text-caption">
                edit thread name
              </span>
            </v-tooltip>

            <ThreadRename @menuStateChange="toggleMenu" />
          </v-btn>

          <span class="text-body-1">
            Group Chat
          </span>
        </div>

        <span class="text-caption text-grey-darken-1 pl-2">
          Last active 3 hrs ago
        </span>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';
import EditThread from './EditThread.vue';
import ThreadRename from './ThreadRename.vue';
import ThreadParticipants from './ThreadParticipants.vue';

export default {
  name:"ThreadAppBar",
  
  components: {
    EditThread,
    ThreadParticipants,
    ThreadRename,
  },

  data() {
    return {
      menuState: false,
    }
  },

  methods: {
    toggleMenu(newState) {
      this.menuState = newState
    },
    ...mapActions("ui", ["toggleChatDrawer"]),
  },
};
</script>

<style scoped>
:deep(.v-toolbar__prepend) {
  margin-inline: 0px auto;
}

:deep(.v-btn--size-default) {
  min-width: 36px;
}

.toggle-chat-list {
  padding: 0px;
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  margin-right: 12px;
}

:deep(.v-list-item--density-compact) {
  min-height: 30px !important;
}
</style>