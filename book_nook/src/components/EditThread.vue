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
              <ListUsers
                :name="user.name"
                :email="user.email"
                :avatar="user.avatar"
                btnType="tonal"
                icon="mdi-plus"
                :disabled="false"
              />
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
              <template v-for="user in allUsers" :key="user.id">
                <ListUsers
                  :name="user.name"
                  :email="user.email"
                  :avatar="user.avatar"
                  btnType="tonal"
                  icon="mdi-minus"
                  :disabled="false"
                />
              </template>
            </v-list>
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
      tab: null,
      searchQuery: "",
    }
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