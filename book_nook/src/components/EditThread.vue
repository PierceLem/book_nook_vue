<template>
  <v-menu 
    activator="parent"
    :close-on-content-click="false"
    location="start"
  >
    <v-card width="300px">
      <v-tabs
        v-model="tab"
      >
        <v-tab value="add" width="150px">Add Users</v-tab>
        <v-tab value="remove" width="150px">Remove Users</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="add">
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
                    class="ml-1"
                  >
                    <v-icon size="small">mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-list-item>

              <v-divider class="ml-12"></v-divider>
            </template>
          </v-list>
        </v-tabs-window-item>

        <v-tabs-window-item value="remove">
          <v-list 
            density="compact" 
            class="py-0 px-1" 
            style="scrollbar-width: thin;"
          >
            <v-list-item class="justify-center text-center py-2">
              <v-chip>
                Current Participants
              </v-chip>
            </v-list-item>

            <v-divider></v-divider>

            <v-list 
              density="compact" 
              class="pa-1" 
              max-height="300px"
              style="scrollbar-width: thin;"
            >
              <template v-for="user in users" :key="user.id">
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
                      class="ml-1"
                    >
                      <v-icon size="small">mdi-minus</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>

                <v-divider class="ml-12"></v-divider>
              </template>
            </v-list>
          </v-list>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "EditThread",
  data() {
    return {
      tab: null,
      searchQuery: "",
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
    }
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
</style>