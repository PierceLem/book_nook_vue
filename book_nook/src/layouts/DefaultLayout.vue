<template>
  <v-app>
    <!-- Navigation Drawer -->
    <NavDrawer />

    <!-- AppBar -->
    <AppBar />

    <!-- Main Content -->
    <v-main 
      class="main" 
      :style="{ paddingLeft: mainPadding }"
    >
      <v-container class="main-container">
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
    isMobileView() {
      return this.$vuetify.display.width < 1100;
    },
    mainPadding() {
      if (!this.isMobileView && this.isNavDrawerOpen) {
        return "260px";
      }
      return "16px";
    },
  },
};
</script>

<style scoped>
.main {
  min-height: 100vh;
  min-width: 100%;
  padding-bottom: 16px;
  padding-right: 16px;
}
.main-container {
  min-height: 100%;
  min-width: 100%;
}
</style>