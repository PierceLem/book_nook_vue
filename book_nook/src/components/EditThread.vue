<template>
  <v-menu 
    v-model="menu"
    activator="parent"
    location="bottom"
    :close-on-content-click="false"
    @update:modelValue="emitMenuState"
  >
    <v-card width="300px" height="400px">
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
            <template v-for="user in filteredUsers" :key="user.id">
              <ListUsers
                :name="user.name"
                :email="user.email"
                :avatar="user.avatar"
                btnType="tonal"
                icon="mdi-plus"
                :disabled="false"
                @user-click="addOverlay = true"
              />
            </template>

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
                  <span class="text-indigo">Add "username"</span>
                </div>

                <v-btn density="compact" variant="tonal" color="green" class="mb-2">confirm</v-btn>
              </v-card>
            </v-overlay>
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
            <template v-for="user in allUsers" :key="user.id">
              <ListUsers
                :name="user.name"
                :email="user.email"
                :avatar="user.avatar"
                btnType="tonal"
                icon="mdi-minus"
                :disabled="false"
                @user-click="kickOverlay = true"
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
                  <span class="text-indigo">Kick "username"</span>
                </div>

                <v-btn density="compact" variant="tonal" color="error" class="mb-2">confirm</v-btn>
              </v-card>
            </v-overlay>
          </v-list>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import ListUsers from './ListUsers.vue';

export default {
  name: "EditThread",

  components: {
    ListUsers,
  },

  data() {
    return {
      menu: false,
      tab: null,
      addOverlay: false,
      kickOverlay: false,
      searchQuery: "",
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
    }
  },

  methods: {
    emitMenuState(val) {
      this.menu = val;
      this.$emit('menuStateChange', val);
      console.log(val);
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