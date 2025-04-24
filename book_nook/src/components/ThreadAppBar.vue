<template>
  <v-app-bar 
    elevation="0" 
    density="comfortable"
  >
    <div class="w-100 h-100 pt-1 px-2">
      <div class="nav-wrapper">
        <div class="d-flex flex-row align-center">
          <v-btn 
            variant="tonal" 
            width="36-px" 
            height="36-px" 
            rounded="0"
            color="indigo-darken-3"
            class="toggle-chat-list"
            @click="toggleChatDrawer"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>

            <v-tooltip 
              location="bottom" 
              activator="parent"
              open-delay="800"
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
                variant="tonal" 
                tile
                rounded
                icon
                height="20px"
                width="20px"
                size="x-small" 
                color="indigo-darken-3"
                @click="toggleMenu"
              >
                <v-icon>mdi-pencil</v-icon>

                <v-tooltip 
                  :open-on-hover="!menuState"
                  location="bottom" 
                  activator="parent" 
                  open-delay="800"
                >
                  <span class="text-caption">
                    edit thread name
                  </span>
                </v-tooltip>

                <ThreadRename @menuStateChange="toggleMenu" />
              </v-btn>

              <span class="text-body-1 text-indigo-darken-3">
                Group Chat
              </span>
            </div>

            <span class="text-caption text-indigo-darken-3 opacity-70 pl-2">
              Last active 3 hrs ago
            </span>
          </v-container>
        </div>

        <div class="d-flex flex-row align-center">
          <v-tooltip location="left" open-delay="800">
            <template v-slot:activator="{ props }">
              <v-btn 
                icon 
                tile
                rounded="lg"
                variant="tonal" 
                size="36px"
                color="indigo-darken-3"
                class="mr-2"
                v-bind="props"
              >
                <v-icon size="25px"
                  >mdi-account-edit-outline
                </v-icon>

                <EditThread />
              </v-btn>
            </template>

            <span class="text-caption">
              edit thread
            </span>
          </v-tooltip>
        </div>
      </div>
    </div>
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
.nav-wrapper {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #C5CAE9;
  overflow: hidden;
}

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