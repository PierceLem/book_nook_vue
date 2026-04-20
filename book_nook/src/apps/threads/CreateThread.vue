<template>
  <v-menu 
    v-model="isOpen"
    @update:modelValue="emitMenuState"
    activator="parent"
    :close-on-content-click="false"
    location="bottom"
  >
    <v-card width="300px">
      <v-list-item class="text-center py-1 bg-indigo">
        <span class="text-h6">Create new thread</span>
      </v-list-item>

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
        max-height="300px" 
        style="scrollbar-width: thin;"
      >
        <template v-if="filteredFriends">
          <ListUsers 
            v-for="user in filteredFriends"
            :name="user.other_user.username"
            :email="user.other_user.email"
            :avatar="user.other_user.avatar"
            btnType="tonal"
            icon="mdi-plus"
            :disabled="selectedUsers.some(u => u.other_user.id === user.other_user.id) || selectedUsers.length >= 10"
            @userClick="addUser(user)"
          />
        </template>
      </v-list>

      <div 
        v-if="selectedUsers.length > 0"
        class="selected-users-wrapper"
      >
        <v-list-item 
          min-height="0px" 
          class="text-center py-0 px-2"
        >
          <v-chip
            v-for="user in selectedUsers"
            :key="user.other_user.id"
            density="comfortable"
            color="indigo"
            :ripple="false"
            closable
            @click:close="removeUser(user.other_user.id)"
            class="pl-1 mt-2 mb-1 mx-1"
          >
            <v-avatar 
              left size="22px" 
              :image="user.other_user.avatar"
            >
            </v-avatar>

            <v-tooltip 
              activator="parent" 
              location="top" 
              offset="2px"
            >
              <span class="text-caption">{{ user.other_user.username }}</span>
            </v-tooltip>
          </v-chip>
        </v-list-item>

        <div class="d-flex flex-row">
          <v-col 
            cols="3" 
            class="pa-0"
          >
          </v-col>

          <v-col 
            cols="6" 
            class="pa-0 d-flex align-center justify-center"
          >
            <v-btn 
              class="my-2"
              variant="tonal"
              color="indigo"
              density="comfortable"
              rounded="lg"
              @click="createThread"
            >
              <template v-slot:append>
                <v-icon>mdi-check</v-icon>
              </template>
              create
            </v-btn>
          </v-col>
            
          <v-col 
            cols="3" 
            class="pa-0 d-flex align-center justify-center"
          >
            <span class="text-caption">
              {{ selectedUsers.length }} / {{ maxUsers }}
            </span>
          </v-col>
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';
import ListUsers from '@/apps/main/components/ListUsers.vue';

export default {
  name: "CreateThread",

  components: {
    ListUsers,
  },

  data() {
    return {
      isOpen: false,
      searchQuery: "",
      selectedUsers: [],
      maxUsers: 10,
    };
  },

  methods: {
    addUser(user) {
      if (!this.selectedUsers.some((u) => u.other_user.id === user.other_user.id)) {
        this.selectedUsers.push(user);
      }
    },

    removeUser(userId) {
      this.selectedUsers = this.selectedUsers.filter((user) => user.other_user.id !== userId);
    },

    emitMenuState() {
      let newState = this.isOpen
      this.$emit('menuStateChange', newState);
    },

    createThread() {
      const participantIds = this.selectedUsers.map((participant) => participant.other_user.id);
      participantIds.push(this.$store.state.auth.user.id);
      this.$store.dispatch("threadStore/addNewThread", participantIds);
      this.selectedUsers = [];
      this.isOpen = false;
    }
  },

  computed: {
    ...mapState('social', [
      'friends'
    ]),

    filteredFriends() {
      if (!this.searchQuery) return this.friends;

      const q = this.searchQuery.toLowerCase();
      return this.friends.filter(friend => {
        const { username, email } = friend.other_user;
        return (
          username.toLowerCase().includes(q) ||
          email.toLowerCase().includes(q)
        )
      })
    }
  },
};
</script>

<style scoped>
.v-card {
  overflow: hidden !important;
}

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

.selected-users-wrapper {
  border-top: solid 2px rgba(63, 81, 181, 0.25);
}

.username-tooltip::v-deep(.v-overlay__content) {
  padding: 0px 10px;
}
</style>