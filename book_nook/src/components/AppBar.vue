<template>
  <v-app-bar :elevation="3" color="blue-grey-darken-3">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        @click.prevent="toggleDrawer"
        class="ml-2 mr-4"
      ></v-app-bar-nav-icon>
    </template>

    <template v-slot:append>
      <v-menu v-model="menu" :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list class="list-item-header">
            <v-list-item class="d-flex justify-center align-center">
              <span class="text-h6"
                >Notifications Center</span
              >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

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

            <v-btn variant="text" @click="menu = false"> 
              Cancel 
            </v-btn>

            <v-btn color="primary" variant="text" @click="menu = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-divider vertical class="mx-2 my-2" />

      <v-btn icon class="mr-2">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <v-btn icon class="mr-2">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppBar",
  data() {
    return {
      drawer: true,
      menu: false,
      fav: false,
      message: false,
      hints: false,
    };
  },
  computed: {
    ...mapState("ui", {
      navDrawerState: (state) => state.navDrawer,
    }),
  },
  methods: {
    ...mapActions("ui", ["setDrawer"]),
    toggleDrawer() {
      this.setDrawer(!this.navDrawerState);
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(isSmallScreen) {
      if (isSmallScreen) {
        this.setDrawer(false);
      }
    },
  },
};
</script>
