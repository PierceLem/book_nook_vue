<template>
  <v-navigation-drawer
    floating
    :mobile-breakpoint="1100"
    v-model="navDrawer"
    class="rounded-lg ma-4 custom-sidebar"
  >
    <v-container class="pa-5 bg-transparent">
      <v-row
        align="center"
        class="bg-blue-grey-darken-3 rounded-lg elevation-6"
      >
        <v-col cols="auto" class="pr-1">
          <v-img src="@/assets/logo-ct.png" height="48" width="48"></v-img>
        </v-col>
        <v-col class="pl-1">
          <span class="text-h5 font-weight-bold font-family-serif"
            >Book Nook</span
          >
        </v-col>
      </v-row>
    </v-container>

    <v-list nav>
      <v-list-item
        prepend-icon="mdi-book-search"
        title="Discover"
        value="Discover"
        class="text-blue-grey-darken-4"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-bookshelf"
        title="Bookshelf"
        value="Bookshelf"
        class="text-blue-grey-darken-4"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-message-text"
        title="Messages"
        value="Messages"
        class="text-blue-grey-darken-4"
      >
      </v-list-item>

      <v-divider class="mb-1 text-blue-grey-darken-4"></v-divider>

      <v-list-item
        prepend-icon="mdi-account-circle"
        title="Profile"
        value="Profile"
        class="text-blue-grey-darken-4"
      >
      </v-list-item>
    </v-list>

    <v-btn prepend-icon="mdi-logout" class="logout-btn bg-blue-grey-darken-3" @click="logout">
      Logout
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios';

export default {
  computed: {
    ...mapState("ui", {
      navDrawerState: (state) => state.navDrawer,
    }),
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
      // First, attempt to log out from the server (revoke the token)
      axios
        .post("/api/v1/token/logout/")
        .then(() => {
          localStorage.removeItem("token");
          this.$store.commit("setToken", "");

          axios.defaults.headers.common["Authorization"] = "";

          this.$router.push("/auth/login");
        })
        .catch((error) => {
          console.error("Error logging out:", error);
          localStorage.removeItem("token");
          this.$store.commit("setToken", "");
          axios.defaults.headers.common["Authorization"] = "";
          this.$router.push("/auth/login");
        });
    }
  },
};
</script>

<style scoped>
.custom-sidebar {
  height: calc(100vh - 32px) !important;
  max-width: 224px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
}
</style>
