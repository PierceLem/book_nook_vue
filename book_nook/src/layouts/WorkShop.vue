<template>
  <v-app>
    <v-navigation-drawer
      :mobile-breakpoint="1100"
      color="blue-grey-darken-4"
      elevation="4"
      width="224"
      v-model="navDrawer"
      class="nav-drawer"
    >
      <v-sheet class="ma-0 py-0 d-flex flex-row align-center bg-blue-grey-darken-3" elevation="4">
        <v-col>
          <v-img src="@/assets/logo-ct.png" height="80px" width="80px"></v-img>
        </v-col>
        
        <v-col class="ma-0 pa-0 d-flex flex-column">
          <h2>BOOK</h2>
          <h2>NOOK</h2>
        </v-col>
        
      </v-sheet>

      <v-list nav>
        <v-container class="pa-0 my-2 d-flex flex-row align-center justify-space-between">
          <v-divider></v-divider>
          <span class="drawer-subtitle">books</span>
          <v-divider></v-divider>
        </v-container>

        <v-list-item
          prepend-icon="mdi-book-search"
          title="Discover"
          value="Discover"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-bookshelf"
          title="Bookshelf"
          value="Bookshelf"
        >
        </v-list-item>

        <v-container class="pa-0 my-2 d-flex flex-row align-center justify-space-between">
          <v-divider></v-divider>
          <span class="drawer-subtitle">users</span>
          <v-divider></v-divider>
        </v-container>

        <v-list-item
          prepend-icon="mdi-account-circle"
          title="Profile"
          value="Profile"
        >
        </v-list-item>

        <v-list-item
          prepend-icon="mdi-message-text"
          title="Messages"
          value="Messages"
        >
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <v-divider></v-divider>

      <v-list nav class="pa-3">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Username"
          subtitle="E-mail"
          class="bg-blue-grey-darken-3 px-1"
          elevation="3"
        >
          <template v-slot:append>
            <v-btn 
              size="small" 
              variant="plain" 
              icon
              class="account-logout"
              @click="logout"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "WorkShop",
  data() {
    return {
      navDrawer: true,
    };
  },
};
</script>

<style scoped>
.workshop {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.nav-drawer::v-deep(.v-navigation-drawer__content) {
  display: flex !important;
  flex-direction: column !important;
}

.drawer-subtitle {
  font-size: x-small;
  font-weight: 300;
  padding-inline: 5px;
}

.account-logout:hover {
  transition: none !important;
  background-color: transparent !important;
}
</style>

