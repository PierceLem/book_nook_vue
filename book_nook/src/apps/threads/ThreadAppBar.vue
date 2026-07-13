<template>
  <div class="thread-app-bar">
    <div class="w-100 h-100">
      <div class="nav-wrapper">
        <div class="d-flex flex-row align-center">
          <v-btn 
            variant="tonal" 
            width="36-px" 
            height="36-px" 
            rounded="0"
            color="indigo"
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

          <ThreadParticipants
            :participants="threadDetail.participants_detail"
            :avatar="threadDetail.thread_avatar"
          />

          <v-container class="d-flex flex-column pl-2">
            <div>
              <v-tooltip 
                v-if="threadDetail.participants_detail.length > 2"
                v-model="showRenameHint"
                location="top" 
                offset="3"
                open-delay="800"
                max-width="300px"
              >
                <template v-slot:activator="{ props }">
                  <v-btn 
                    variant="tonal" 
                    tile
                    rounded
                    icon
                    height="20px"
                    width="20px"
                    size="x-small" 
                    color="indigo"
                    v-bind="props"
                  >
                    <v-icon>mdi-pencil</v-icon>
                    <ThreadRename 
                      :id="threadDetail.id"
                      @menuStateChange="renameMenuState = $event" 
                    />
                  </v-btn>
                </template>

                <span class="text-caption text-center d-block">
                  Consider renaming this thread
                </span>
              </v-tooltip>

              <span class="text-body-1 text-indigo ml-1">
                {{ getThreadDisplayName(threadDetail) }}
              </span>
            </div>

            <span class="text-caption text-indigo opacity-70 pl-2">
              Last active: {{ formatDate(threadDetail.last_active, now) }}
            </span>
          </v-container>
        </div>

        <div class="d-flex flex-row align-center">
          <v-tooltip location="left" open-delay="800" :disabled="editThreadMenuState">
            <template v-slot:activator="{ props }">
              <v-btn 
                icon 
                tile
                rounded="lg"
                variant="tonal" 
                size="36px"
                color="indigo"
                class="mr-2"
                v-bind="props"
              >
                <v-icon size="25px">
                  mdi-account-edit-outline
                </v-icon>

                <EditThread 
                  :participants="threadDetail.participants_detail"
                  :threadId="threadDetail.id"
                  @menuStateChange="editThreadMenuState = $event" 
                />
              </v-btn>
            </template>

            <span class="text-caption">
              edit thread
            </span>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { formatDate } from '@/utils/dateUtils';
import EditThread from './EditThread.vue';
import ThreadRename from './ThreadRename.vue';
import ThreadParticipants from './components/ThreadParticipants.vue';

export default {
  name:"ThreadAppBar",
  
  components: {
    EditThread,
    ThreadParticipants,
    ThreadRename,
  },

  data() {
    return {
      renameMenuState: false,
      editThreadMenuState: false,
    }
  },

  computed: {
    threadDetail() {
      return this.$store.state.threadStore.activeThread;
    },

    showRenameHint() {
      const name = this.getThreadDisplayName(this.threadDetail);
      return name == 'Group chat';
    },

    ...mapGetters("threadStore", ["getThreadDisplayName"]),

    ...mapState('ui', ['now']),
  },

  methods: {
    ...mapActions("ui", ["toggleChatDrawer"]),

    formatDate,
  },
};
</script>

<style scoped>
.thread-app-bar {
  height: 54px;
  flex-shrink: 0;
}

.nav-wrapper {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #E8EAF6;
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