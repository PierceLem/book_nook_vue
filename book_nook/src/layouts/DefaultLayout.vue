<template>
  <v-app>
    <!-- Navigation Drawer -->
    <NavDrawer />

    <!-- AppBar -->
    <AppBar />

    <!-- Main Content -->
    <v-main :class="activeComponentClass">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedComponents">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </router-view>
    </v-main>

    <Snackbar />
  </v-app>
</template>

<script>
import NavDrawer from "@/apps/main/NavDrawer.vue";
import AppBar from "@/apps/main/AppBar.vue";
import Snackbar from "@/apps/main/components/Snackbar.vue";
import { mapState } from "vuex";

export default {
  components: {
    NavDrawer,
    AppBar,
    Snackbar,
  },

  computed: {
    ...mapState("ui", {
      isNavDrawerOpen: (state) => state.navDrawer,
    }),

    activeComponentClass() {
      return this.$route.name === "Discover" ? "discover-padding" : "";
    },

    cachedComponents() {
      return ["Discover", "Threads"];
    },
  },
};
</script>

<style scoped>
@media (max-width: 830px) {
  :deep(.discover-padding) {
    --v-layout-left: 64px !important;
  }
}
</style>

<style>
.v-app {
  scrollbar-width: thin;
  scrollbar-color: rgba(26, 35, 126, 0.5) transparent;
}

.v-application {
  height: 100vh;
  display: flex;
}

.v-main {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
}
</style>