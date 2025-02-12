<template>
  <v-menu 
    v-model="isOpen"
    @update:modelValue="emitMenuState"
    activator="parent"
    :close-on-content-click="false"
    location="end"
  >
    <v-card width="300px">
      <v-list-item class="text-center">
        <span class="text-h6">Create new thread</span>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item class="px-2">
        <input 
          v-model="searchQuery"
          class="custom-input" 
          type="text" 
          placeholder="Search Users" 
        />
        <i class="input-icon mdi mdi-magnify"></i>
      </v-list-item>

      <v-divider class="pa-0 ma-0"></v-divider>

      <v-list 
        density="compact" 
        class="pa-1" 
        max-height="300px" 
        style="scrollbar-width: thin;"
      >
        <template v-for="user in filteredUsers" :key="user.id">
          <ListUsers 
            :name="user.name"
            :email="user.email"
            :avatar="user.avatar"
            btnType="tonal"
            icon="mdi-plus"
            :disabled="selectedUsers.some(u => u.id === user.id)"
            @userClick="addUser(user)"
          />
        </template>
      </v-list>

      <v-divider class="pa-0 ma-0"></v-divider>

      <v-list-item 
        min-height="0px" 
        class="text-center py-0 px-2"
      >
        <v-chip
          v-for="user in selectedUsers"
          :key="user.id"
          density="comfortable"
          :ripple="false"
          closable
          @click:close="removeUser(user.id)"
          class="pl-1 mt-2 mb-1 mx-1"
        >
          <v-avatar 
            left size="22px" 
            :image="user.avatar"
          >
          </v-avatar>

          <v-tooltip 
            activator="parent" 
            location="top" 
            offset="2px"
          >
            <span class="text-caption">{{ user.name }}</span>
          </v-tooltip>
        </v-chip>
      </v-list-item>

      <div 
        class="d-flex flex-row" 
        v-if="selectedUsers.length > 0"
      >
        <v-col 
          cols="3" 
          class="pa-0"
        >
        </v-col>

        <v-col 
          cols="6" 
          class="pa-0 d-flex align-center justify-center"
        >
          <v-btn class="my-2">
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
          <span 
            class="text-caption"
          >
            {{ selectedUsers.length }} / {{ maxUsers }}
          </span>
        </v-col>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import ListUsers from './ListUsers.vue';

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
      if (!this.selectedUsers.some((u) => u.id === user.id)) {
        this.selectedUsers.push(user);
      }
    },
    removeUser(userId) {
      this.selectedUsers = this.selectedUsers.filter((user) => user.id !== userId);
    },
    emitMenuState() {
      let newState = this.isOpen
      this.$emit('menuStateChange', newState);
    },
  },

  computed: {
    ...mapGetters("auth", ["allUsers"]),

    filteredUsers() {
      if (!this.searchQuery) return this.allUsers;

      const query = this.searchQuery.toLowerCase();

      return this.allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
  },
};
</script>

<style scoped>
.v-card {
  overflow: hidden !important;
}

.custom-input {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px 8px 30px;
  font-size: 12px;
  width: 100%;
  max-width: 300px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.custom-input:focus {
  outline: none;
}

.username-tooltip::v-deep(.v-overlay__content) {
  padding: 0px 10px;
}
</style>