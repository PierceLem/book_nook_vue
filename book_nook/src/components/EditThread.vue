<template>
  <v-menu 
    v-model="menu"
    activator="parent"
    location="bottom"
    :close-on-content-click="false"
    @update:modelValue="emitMenuState"
  >
    <v-card width="300px" max-height="400px">
      <div class="d-flex flex-row justify-space-evenly my-1">
        <template
          v-for="btn in btns"
          :key="btn.key"
        >
          <v-tooltip
            open-delay="500"
            location="top"
            v-if="btn.show()"
            :text="btn.tooltip"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :icon="btn.icon"
                variant="text"
                color="indigo"
                rounded="lg"
                tile
                :active="activeSection === btn.key"
                :active-color="btn.activeColor"
                @click="toggleSection(btn.key)"
              ></v-btn>
            </template>
          </v-tooltip>
        </template>
      </div>

      <v-expand-transition>
        <div v-show="activeSection === 'add'">
          <v-list 
            density="compact" 
            class="px-1 pb-0 list-users" 
            max-height="304px" 
            min-height="304px"
            style="scrollbar-width: thin;"
          >
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
              class="px-0 pb-2 mt-1"
            ></v-text-field>

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
            </template>

            <ConfirmOverlay 
              v-model="addOverlay"
              :avatar="addedParticipant.avatar"
              :username="addedParticipant.username"
              :action="'add'"
              @confirm="addParticipant()"
            />
          </v-list>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div v-show="activeSection === 'kick'">
          <v-list 
            density="compact" 
            class="px-1 pt-1 pb-0 list-users" 
            max-height="304px"
            min-height="304px"
          >
            <div class="text-center pb-2">
                <span class="text-h6 text-indigo">Current Participants</span>
            </div>

            <template v-for="participant in kickableParticipants">
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

            <ConfirmOverlay
              v-model="kickOverlay"
              :avatar="kickedParticipant.avatar"
              :username="kickedParticipant.username"
              :action="'kick'"
              @confirm="kickParticipant()"
            />
          </v-list>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div 
          v-show="activeSection === 'leave'"
          style="height: 84px;"
        >
          <div class="text-center pb-2 w-100">
            <span class="text-h6 text-indigo opacity-70 pb-2 d-block">Leave this thread?</span>
            <v-btn
              variant="tonal"
              color="red"
              @click="leaveThread()"
            >Confirm</v-btn> 
          </div>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div 
          v-show="activeSection === 'delete'"
          style="height: 84px;"  
        >
          <div class="text-center pb-2 w-100">
            <span class="text-h6 text-indigo opacity-70 pb-2 d-block">Delete this thread?</span>
            <v-btn
              variant="tonal"
              color="red"
              @click="deleteThread()"
            >Confirm</v-btn> 
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </v-menu>
</template>

<script>
import axios from 'axios';
import ConfirmOverlay from './ConfirmOverlay.vue';
import ListUsers from './ListUsers.vue';
import { mapState } from 'vuex';

export default {
  name: "EditThread",

  components: {
    ConfirmOverlay,
    ListUsers,
  },

  props: {
    participants: Array,
    threadId: Number,
  },

  data() {
    return {
      btns: [
        {
          key: 'add',
          icon: 'mdi-account-plus-outline',
          tooltip: 'add user',
          activeColor: 'green',
          show: () => true,
        },
        {
          key: 'kick',
          icon: 'mdi-account-remove-outline',
          tooltip: 'kick user',
          activeColor: 'red',
          show: () => this.participants.length > 2,
        },
        {
          key: 'leave',
          icon: 'mdi-exit-run',
          tooltip: 'leave thread',
          activeColor: 'red',
          show: () => this.participants.length > 2,
        },
        {
          key: 'delete',
          icon: 'mdi-delete-outline',
          tooltip: 'delete thread',
          activeColor: 'red',
          show: () => this.participants.length === 2,
        },
      ],
      menu: false,
      activeSection: null,
      addOverlay: false,
      kickOverlay: false,
      searchQuery: "",
      friends: [],
      addedParticipant: {},
      kickedParticipant: {},
    }
  },

  inject: ['editThreadParticipants', 'addNewMessage', 'showSnackbar', 'removeThread'],

  mounted() {
    this.fetchUsers();
  },

  computed: {
    ...mapState('auth', ['user']),

    kickableParticipants() {
      const currentUserId = this.user.id

      return this.participants.filter(
        participant => participant.id !== currentUserId
      )
    }
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

    toggleSection(section) {
      if (this.activeSection === section) {
        this.activeSection = null;
        return;
      }
      if (this.activeSection) {
        this.activeSection = null;
        setTimeout(() => {
          this.activeSection = section;
        }, 320)
      } else {
        this.activeSection = section;
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

    leaveThread() {
      this.kickedParticipant = this.user;
      this.kickParticipant('leave');
      this.removeThread(this.threadId);
    },

    addParticipant() {
      const action = 'added';
      const ids = this.participants.map(participant => participant.id);
      ids.push(this.addedParticipant.id);
      this.editParticipants(ids, action);
    },

    kickParticipant(type = null) {
      const action = type ? type : 'kicked';
      const ids = this.participants.map(participant => participant.id);
      const index = ids.findIndex(id => id === this.kickedParticipant.id);
      if (index !== -1) {
        ids.splice(index, 1);
      }
      this.editParticipants(ids, action);
    },

    async editParticipants(ids, action) {
      try {
        const response = await axios.patch(`threads/${this.threadId}/`, {'participants': ids});
        if (action != 'leave') {
          this.editThreadParticipants(response.data.thread);
          this.addNewMessage(response.data.message);
          this.showSnackbar({
            subject: 'Thread Updated Successfully',
            content: '',
            icon: 'mdi-check',
            color: 'green',
          });
          this.kickOverlay = false;
          this.addOverlay = false;
        }
        this.menu = false;
      } catch(error) {
        console.error(error);
        this.showSnackbar({
          subject: error.response?.data?.participants?.[0],
          content: '',
          icon: 'mdi-close',
          color: 'red',
        })
      }
    },

    async deleteThread() {
      try {
        await axios.delete(`threads/${this.threadId}/`);
        this.removeThread(this.threadId);
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