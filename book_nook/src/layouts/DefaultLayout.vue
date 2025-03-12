<template>
  <v-app>
    <!-- Navigation Drawer -->
    <NavDrawer />

    <!-- AppBar -->
    <AppBar />

    <!-- Main Content -->
    <v-main :class="activeComponentClass">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
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

    activeComponentClass() {
      return this.$route.name === "Discover" ? "discover-padding" : "";
    },
  },
};
</script>

<style scoped>
@media (max-width: 700px) {
  :deep(.discover-padding) {
    --v-layout-left: 56px !important;
  }
}
</style>