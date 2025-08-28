<template>
  <v-navigation-drawer
    :mobile-breakpoint="1100"
    floating
    width="224"
    v-model="navDrawer"
    app
    class="py-2 pr-0 pl-2"
  >
    <div class="drawer-content">
      <div class="d-flex flex-column align-center w-100 pt-2">
        <v-img src="@/assets/undraw_reading-time_indigo.svg" width="60%"></v-img>
        <span class="text-h5 text-indigo">BOOK NOOK</span>
      </div>

      <v-list dense nav color="indigo">
        <v-container class="py-0 my-2 d-flex flex-row align-center justify-space-between">
          <v-divider color="indigo"></v-divider>
          <span class="custom-subtitle px-2 text-indigo">books</span>
          <v-divider color="indigo"></v-divider>
        </v-container>

        <v-list-item
          prepend-icon="mdi-book-search"
          base-color="indigo"
          title="Discover"
          value="Discover"
          to="/"
        />

        <v-list-item
          base-color="indigo"
          title="Bookshelf"
          value="Bookshelf"
          to="/bookshelf"
        >
          <template v-slot:prepend>
            <v-badge
              dot
              color="error"
            >
              <v-icon color="indigo">mdi-bookshelf</v-icon>
            </v-badge>
          </template>
        </v-list-item>

        <v-container class="py-0 my-2 d-flex flex-row align-center justify-space-between">
          <v-divider color="indigo"></v-divider>
          <span class="custom-subtitle px-2 text-indigo">users</span>
          <v-divider color="indigo"></v-divider>
        </v-container>

        <v-list-item
          base-color="indigo"
          title="Profile"
          value="Profile"
          to="/my-profile"
        >
          <template v-slot:prepend>
            <v-badge
              dot
              color="error"
            >
              <v-icon color="indigo">mdi-account-circle</v-icon>
            </v-badge>
          </template>
        </v-list-item>

        <v-list-item
          base-color="indigo"
          title="Chat"
          value="Chat"
          to="/chat"
        >
          <template v-slot:prepend>
            <v-badge
              dot
              color="error"
            >
              <v-icon color="indigo">mdi-message-text</v-icon>
            </v-badge>
          </template>
        </v-list-item>
      </v-list>

      <div class="logout-img-wrapper">
        <img :src="require('@/assets/undraw_hooked.svg')" class="logout-img" />
      </div>

      <div class="filler"></div>

      <div class="logout-avatar-container">
        <div class="d-flex flex-column pl-1">
          <span class="text-username">{{ user.username }}</span>
          <span class="text-email">{{ user.email }}</span>
        </div>

        <v-avatar :image="user.avatar"></v-avatar>
      </div>

      <v-btn 
        tile rounded="md" 
        size="22px" 
        color="indigo" 
        variant="text" 
        class="logout-btn" 
        @click="logout"
      >
        <template v-slot="icon">
          <v-icon size="20px">mdi-logout</v-icon>
        </template>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("ui", {
      navDrawerState: (state) => state.navDrawer,
    }),

    ...mapState('auth', ['user']),

    navDrawer: {
      get() {
        return this.navDrawerState;
      },
      set(value) {
        this.$store.dispatch("ui/setDrawer", value);
      },
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
};
</script>

<style scoped>
@media (max-width: 1100px) {
  .v-navigation-drawer {
    background: rgb(255 255 255 / 0%) !important;
  }
}

.custom-subtitle {
  font-size: x-small;
  font-weight: 400;
}

.logout-img-wrapper {
  position: absolute;
  bottom: 8px;
  left: 17px;
  width: 196px;
  height: 90px;
  overflow: hidden;
}

.logout-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
  display: block;
}

.logout-avatar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline-end: 4px;
  position: absolute;
  bottom: 20px;
  left: 21px;
  height: 48px;
  width: 160px;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  background-color: #E8EAF6;
}

.text-email {
  font-size: x-small;
  opacity: 75%;
  color: #3F51B5;
}

.text-username {
  font-size: small;
  color: #3F51B5;
  font-weight: 600;
}

.filler {
  position: absolute;
  bottom: 8px;
  left: 35px;
  width: 160px;
  height: 65px;
  background-color: white;
}

.logout-btn {
  position: absolute;
  bottom: 33px;
  left: 183px;
}

.drawer-content {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: #E8EAF6;
  overflow: hidden;
}

.v-navigation-drawer--temporary.v-navigation-drawer--active {
  box-shadow: none !important;
}

.account-logout:hover {
  transition: none !important;
  background-color: transparent !important;
}
</style>



