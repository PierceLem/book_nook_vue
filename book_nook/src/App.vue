<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
      floating
      v-model="drawer"
      :class="[drawer ? 'mx-4' : 'mx-0']"
      class="rounded-lg mt-4 custom-sidebar"
    >
      <v-container class="pa-5 bg-transparent">
        <v-row align="center" class="bg-blue-grey-darken-3 rounded-lg elevation-6">
          <v-col cols="auto">
            <v-img
              src="@/assets/logo-ct.png"
              height="48"
              width="48"
            ></v-img>
          </v-col>
          <v-col>
            <span class="text-h6 font-weight-bold">Book Nook</span>
          </v-col>
        </v-row>
      </v-container>

      <v-list nav>
        <v-list-item 
          prepend-icon="mdi-book-search" 
          title="Discover" 
          value="Discover" 
          class="text-blue-grey-darken-4">
        </v-list-item>
        <v-list-item 
          prepend-icon="mdi-bookshelf" 
          title="Bookshelf" 
          value="Bookshelf" 
          class="text-blue-grey-darken-4">
        </v-list-item>
        <v-list-item 
          prepend-icon="mdi-message-text" 
          title="Messages" 
          value="Messages"
          class="text-blue-grey-darken-4">
        </v-list-item>

        <v-divider class="mb-1 text-blue-grey-darken-4"></v-divider>

        <v-list-item 
          prepend-icon="mdi-account-circle" 
          title="Profile" 
          value="Profile" 
          class="text-blue-grey-darken-4">
        </v-list-item>
      </v-list>

      <v-btn prepend-icon="mdi-logout" class="logout-btn bg-blue-grey-darken-3">
        Logout
      </v-btn>
    </v-navigation-drawer>

    <v-app-bar 
      :elevation="0"
      class="bg-transparent" 
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon 
          @click.prevent="drawer = !drawer" 
          :class="[drawer ? 'ml-6' : 'ml-2']"
          color="blue-grey-darken-2"
        >
        </v-app-bar-nav-icon>
      </template>

      <template v-slot:append>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon color="blue-grey-darken-2" v-bind="props">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </template>

          <v-card min-width="300">
            <v-list class="list-item-header">
              <v-list-item class="d-flex justify-center align-center">
                <span class="text-h6 text-blue-grey-darken-3">Notifications Center</span>
              </v-list-item>
            </v-list>

            <v-divider class="text-blue-grey-darken-4"></v-divider>

            <v-list>
              <v-list-item>
                <v-switch
                  v-model="message"
                  color="purple"
                  label="Enable messages"
                  hide-details
                ></v-switch>
              </v-list-item>

              <v-list-item>
                <v-switch
                  v-model="hints"
                  color="purple"
                  label="Enable hints"
                  hide-details
                ></v-switch>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                variant="text"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                variant="text"
                @click="menu = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-divider vertical class="mx-2 my-2" color="blue-grey-darken-2" />

        <span class="mr-1 ml-3 text-body-2 font-weight-light text-blue-grey-darken-2">
          Welcome Pierce
        </span>
        
        <v-btn icon color="blue-grey-darken-2">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center ml-6" style="min-height: 100vh;">
      <v-card></v-card>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      menu: false,
      fav: false,
      message: false,
      hints: false,
    };
  },
};
</script>

<style scoped>
.custom-sidebar {
  height: calc(100vh - 32px) !important;
  background-color: #ECEFF1;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1);
}
.list-item-header {
  background-color: #ECEFF1;
}
.logout-btn {
  position: absolute;
  bottom: 16px; /* Adjust distance from the bottom */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Ensure perfect centering */
  width: calc(100% - 32px); /* Optional: Adjust width with padding */
}
</style>