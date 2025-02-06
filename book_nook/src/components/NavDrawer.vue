<template>
  <v-navigation-drawer
    :mobile-breakpoint="1100"
    color="blue-grey-darken-4"
    elevation="4"
    width="224"
    v-model="navDrawer"
    app
  >
    <v-sheet class="ma-0 py-0 d-flex flex-row align-center bg-blue-grey-darken-3" elevation="4">
      <v-col cols="6" class="d-flex flex-row align-right pr-0">
        <v-img src="@/assets/logo-ct.png" height="80px" width="80px"></v-img>
      </v-col>
      
      <v-col cols="6" class="ma-0 pa-0 d-flex flex-column">
        <h2>BOOK</h2>
        <h2>NOOK</h2>
      </v-col>
      
    </v-sheet>

    <v-list dense nav>
      <v-container class="py-0 my-2 d-flex flex-row align-center justify-space-between">
        <v-divider></v-divider>
        <span class="custom-subtitle px-2">books</span>
        <v-divider></v-divider>
      </v-container>

      <v-list-item
        prepend-icon="mdi-book-search"
        title="Discover"
        value="Discover"
        to="/"
      />

      <v-list-item
        prepend-icon="mdi-bookshelf"
        title="Bookshelf"
        value="Bookshelf"
        to="/bookshelf"
      />

      <v-container class="py-0 my-2 d-flex flex-row align-center justify-space-between">
        <v-divider></v-divider>
        <span class="custom-subtitle px-2">users</span>
        <v-divider></v-divider>
      </v-container>

      <v-list-item
        prepend-icon="mdi-account-circle"
        title="Profile"
        value="Profile"
        to="/my-profile"
      />

      <v-list-item
        prepend-icon="mdi-message-text"
        title="Chat"
        value="Chat"
        to="/chat"
      />
    </v-list>

    <v-list nav class="pa-2" style="position: absolute; bottom: 0;">
        <v-list-item
          title="Username"
          class="bg-blue-grey-darken-3 py-2 px-1"
          elevation="3"
        >
          <template v-slot:prepend>
            <v-avatar 
              size="40" 
              class="elevation-6"
            >
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-avatar>
          </template>

          <template v-slot:subtitle>
            <span class="custom-subtitle">parcwill1999@gmail.com</span>
          </template>

          <template v-slot:append>
            <v-btn 
              size="x-small" 
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
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

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
      axios
        .post("/api/v1/token/logout/")
        .then(() => {
          localStorage.removeItem("token");
          this.$store.commit("setToken", "");
          axios.defaults.headers.common["Authorization"] = "";
          this.$router.push("/login");
        })
        .catch(() => {
          localStorage.removeItem("token");
          this.$store.commit("setToken", "");
          axios.defaults.headers.common["Authorization"] = "";
          this.$router.push("/login");
        });
    },
  },
};
</script>

<style scoped>
.custom-subtitle {
  font-size: x-small;
  font-weight: 300;
}

.account-logout:hover {
  transition: none !important;
  background-color: transparent !important;
}
</style>



