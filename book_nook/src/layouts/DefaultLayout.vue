<template>
  <v-app>
    <!-- Navigation Drawer -->
    <NavDrawer />

    <!-- AppBar -->
    <AppBar />

    <!-- Main Content -->
    <v-main>
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
import { KeepAlive } from "vue";

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
@media (max-width: 700px) {
  :deep(.v-main) {
    --v-layout-left: 56px !important;
  }
}
</style>