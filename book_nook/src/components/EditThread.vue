<template>
  <v-menu 
    v-model="menu"
    activator="parent"
    location="bottom"
    :close-on-content-click="false"
    @update:modelValue="emitMenuState"
  >
    <v-card width="300px" max-height="400px">
      <v-tabs
        v-model="tab"
      >
        <v-tab value="add" color="indigo" width="150px">Add Users</v-tab>
        <v-tab value="remove" color="indigo" width="150px">Remove Users</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="add">
          <v-text-field 
            v-model="searchQuery"
            label="Search Friends" 
            variant="outlined" 
            density="compact" 
            color="indigo"
            base-color="indigo"
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            rounded="lg"
            class="px-2 pt-2 pb-0"
          ></v-text-field>

          <v-list 
            density="compact" 
            class="px-1 pt-1 pb-0 list-users" 
            max-height="304px" 
            style="scrollbar-width: thin;"
          >
            <template v-for="friend in friends">
              <ListUsers
                :name="friend.other_user.username"
                :email="friend.other_user.email"
                :avatar="friend.other_user.avatar"
                btnType="tonal"
                icon="mdi-plus"
                :disabled="false"
                @user-click="openAddOverlay(friend.other_user)"
              />

              <v-overlay
                v-model="addOverlay"
                class="align-center justify-center"
                contained
              >
                <v-card class="py-0 px-5 d-flex flex-column align-center justify-center" position="relative" max-width="275px">
                  <v-btn
                    icon
                    tile
                    rounded="0"
                    variant="tonal"
                    color="indigo"
                    height="18px"
                    width="18px"
                    class="undo-btn"
                    @click="addOverlay = false"
                  >
                    <v-icon size="16px">mdi-undo-variant</v-icon>
                  </v-btn>

                  <div class="w-100 text-center pt-5 pb-2">
                    <v-avatar 
                      size="24"
                      class="mr-2"
                      :image="addedParticipant.avatar"
                    ></v-avatar>
                    <span class="text-indigo">{{ addedParticipant.username }}</span>
                  </div>

                  <v-btn 
                    density="compact" 
                    variant="tonal" 
                    color="green" 
                    class="mb-2" 
                    @click="addParticipant()"
                  >add</v-btn>
                </v-card>
              </v-overlay>
            </template>
          </v-list>
        </v-tabs-window-item>

        <v-tabs-window-item value="remove">
          <div class="text-center py-2 bg-indigo">
              <span class="text-h6">Current Participants</span>
          </div>

          <v-list 
            density="compact" 
            class="px-1 pt-1 pb-0 list-users" 
            max-height="304px"
          >
            <template v-for="participant in participants">
              <ListUsers
                :name="participant.username"
                :email="participant.email"
                :avatar="participant.avatar"
                btnType="tonal"
                icon="mdi-minus"
                :disabled="false"
                @user-click="openKickOverlay(participant)"
              />
            </template>

            <v-overlay
              v-model="kickOverlay"
              class="align-center justify-center"
              contained
            >
              <v-card class="py-0 px-5 d-flex flex-column align-center justify-center" position="relative" max-width="275px">
                <v-btn
                  icon
                  tile
                  rounded="0"
                  variant="tonal"
                  color="indigo"
                  height="18px"
                  width="18px"
                  class="undo-btn"
                  @click="kickOverlay = false"
                >
                  <v-icon size="16px">mdi-undo-variant</v-icon>
                </v-btn>

                <div class="w-100 text-center pt-5 pb-2">
                  <v-avatar 
                    size="24"
                    class="mr-2"
                    :image="kickedParticipant.avatar"
                  ></v-avatar>
                  <span class="text-indigo">{{ kickedParticipant.username }}</span>
                </div>

                <v-btn 
                  density="compact" 
                  variant="tonal"
                  color="error" 
                  class="mb-2" 
                  @click="kickParticipant()"
                >kick</v-btn>
              </v-card>
            </v-overlay>
          </v-list>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-menu>
</template>

<script>
import axios from 'axios';
import ListUsers from './ListUsers.vue';

export default {
  name: "EditThread",

  components: {
    ListUsers,
  },

  props: {
    participants: Array,
    threadId: Number,
  },

  data() {
    return {
      menu: false,
      tab: null,
      addOverlay: false,
      kickOverlay: false,
      searchQuery: "",
      friends: [],
      addedParticipant: {},
      kickedParticipant: {},
    }
  },

  inject: ['editThreadParticipants'],

  mounted() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/my-friends/');
        this.friends = response.data.friends;
      } catch(error) {
        console.error(error);
      }
    },

    openKickOverlay(participant) {
      this.kickedParticipant = participant;
      this.kickOverlay = true;
    },

    openAddOverlay(participant) {
      this.addedParticipant = participant;
      this.addOverlay = true;
    },

    addParticipant() {
      const ids = this.participants.map(participant => participant.id);
      ids.push(this.addedParticipant.id);
      this.editParticipants(ids);
    },

    kickParticipant() {
      const ids = this.participants.map(participant => participant.id);
      const index = ids.findIndex(id => id === this.kickedParticipant.id);
      if (index !== -1) {
        ids.splice(index, 1);
      }
      this.editParticipants(ids);
    },

    async editParticipants(ids) {
      try {
        const response = await axios.patch(`threads/${this.threadId}/`, {'participants': ids});
        this.editThreadParticipants(response.data);
        this.kickOverlay = false;
        this.addOverlay = false;
        this.menu = false;
      } catch(error) {
        console.error(error);
      }
    },

    emitMenuState(val) {
      this.menu = val;
      this.$emit('menuStateChange', val);
    },
  },
};
</script>

<style scoped>
:deep(.v-field) {
  --v-field-padding-start: 7px;
}

:deep(.v-field--prepended) {
  padding-inline-start: 8px;
}

:deep(.v-field__input) {
  color: #3F51B5;
}

:deep(.v-field-label) {
  color: #3F51B5;
}

:deep(.v-icon.mdi-magnify) {
  color: #3F51B5;
}

.list-users {
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.undo-btn {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>