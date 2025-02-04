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
          <v-list-item class="participant-list mx-2 pa-0">
            <template v-slot:prepend>
              <v-avatar 
                size="26px" 
                :image="user.avatar"
              >
              </v-avatar>
            </template>

            <template v-slot:title>
              <div class="d-flex flex-column">
                <span class="text-body-2">{{ user.name }}</span>
                <span class="text-caption email-text">{{ user.email }}</span>
              </div>
            </template>

            <template v-slot:append>
              <v-btn
                height="26px"
                width="26px"
                icon
                variant="tonal"
                :disabled="selectedUsers.some(u => u.id === user.id)"
                @click="selectedUsers.length < maxUsers && addUser(user)"
                class="ml-1"
              >
                <v-icon size="small">mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-list-item>

          <v-divider class="ml-12"></v-divider>
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
export default {
  name: "CreateThread",

  data() {
    return {
      isOpen: false,
      searchQuery: "",
      selectedUsers: [],
      maxUsers: 10,
      users: [
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
    filteredUsers() {
      if (!this.searchQuery) return this.users;

      const query = this.searchQuery.toLowerCase();

      return this.users.filter(user =>
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

.email-text {
  line-height: 12px;
  color: #9E9E9E;
}

.username-tooltip::v-deep(.v-overlay__content) {
  padding: 0px 10px;
}
</style>