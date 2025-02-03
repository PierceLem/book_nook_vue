<template>
  <v-app>
    <!-- Navigation Drawer -->
    <NavDrawer />

    <!-- AppBar -->
    <AppBar />

    <!-- Main Content -->
    <v-main>
      <v-container class="pa-0 ma-0" min-width="100%">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
import AppBar from "@/components/AppBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    NavDrawer,
    AppBar,
  },

  computed: {
    ...mapState("ui", {
      isNavDrawerOpen: (state) => state.navDrawer,
    }),
  },
};
</script>

<style scoped>
</style>