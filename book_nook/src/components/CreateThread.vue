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
            :key="user.id"
            density="comfortable"
            color="indigo"
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
      filteredUsers: [],
      allUsers: [
        { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", avatar: "https://randomuser.me/api/portraits/women/85.jpg" },
        { id: 2, name: "Bob Smith", email: "bob.smith@example.com", avatar: "https://randomuser.me/api/portraits/men/85.jpg" },
        { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", avatar: "https://randomuser.me/api/portraits/men/84.jpg" },
        { id: 4, name: "Diana Ross", email: "diana.ross@example.com", avatar: "https://randomuser.me/api/portraits/women/84.jpg" },
        { id: 5, name: "Ethan Carter", email: "ethan.carter@example.com", avatar: "https://randomuser.me/api/portraits/men/83.jpg" },
        { id: 6, name: "Fiona Adams", email: "fiona.adams@example.com", avatar: "https://randomuser.me/api/portraits/women/83.jpg" },
        { id: 7, name: "George Harris", email: "george.harris@example.com", avatar: "https://randomuser.me/api/portraits/men/82.jpg" },
        { id: 8, name: "Hannah White", email: "hannah.white@example.com", avatar: "https://randomuser.me/api/portraits/women/82.jpg" },
        { id: 9, name: "Ian Brooks", email: "ian.brooks@example.com", avatar: "https://randomuser.me/api/portraits/men/81.jpg" },
        { id: 10, name: "Jessica Davis", email: "jessica.davis@example.com", avatar: "https://randomuser.me/api/portraits/women/81.jpg" },
        { id: 11, name: "Kevin Miller", email: "kevin.miller@example.com", avatar: "https://randomuser.me/api/portraits/men/80.jpg" },
        { id: 12, name: "Laura Wilson", email: "laura.wilson@example.com", avatar: "https://randomuser.me/api/portraits/women/80.jpg" },
        { id: 13, name: "Michael Scott", email: "michael.scott@example.com", avatar: "https://randomuser.me/api/portraits/men/79.jpg" },
        { id: 14, name: "Nancy Allen", email: "nancy.allen@example.com", avatar: "https://randomuser.me/api/portraits/women/79.jpg" },
        { id: 15, name: "Oliver Wright", email: "oliver.wright@example.com", avatar: "https://randomuser.me/api/portraits/men/78.jpg" },
        { id: 16, name: "Paula Thomas", email: "paula.thomas@example.com", avatar: "https://randomuser.me/api/portraits/women/78.jpg" },
        { id: 17, name: "Quentin Baker", email: "quentin.baker@example.com", avatar: "https://randomuser.me/api/portraits/men/77.jpg" },
        { id: 18, name: "Rachel Green", email: "rachel.green@example.com", avatar: "https://randomuser.me/api/portraits/women/77.jpg" },
        { id: 19, name: "Samuel Parker", email: "samuel.parker@example.com", avatar: "https://randomuser.me/api/portraits/men/76.jpg" },
        { id: 20, name: "Tina Roberts", email: "tina.roberts@example.com", avatar: "https://randomuser.me/api/portraits/women/76.jpg" },
        { id: 21, name: "Ulysses Turner", email: "ulysses.turner@example.com", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
        { id: 22, name: "Victoria Evans", email: "victoria.evans@example.com", avatar: "https://randomuser.me/api/portraits/women/75.jpg" },
        { id: 23, name: "William Sanchez", email: "william.sanchez@example.com", avatar: "https://randomuser.me/api/portraits/men/74.jpg" },
        { id: 24, name: "Xena Brooks", email: "xena.brooks@example.com", avatar: "https://randomuser.me/api/portraits/women/74.jpg" },
        { id: 25, name: "Yusuf Coleman", email: "yusuf.coleman@example.com", avatar: "https://randomuser.me/api/portraits/men/73.jpg" },
        { id: 26, name: "Zara Morgan", email: "zara.morgan@example.com", avatar: "https://randomuser.me/api/portraits/women/73.jpg" },
      ],
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