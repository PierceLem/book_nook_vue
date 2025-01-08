<template>
  <v-layout class="rounded rounded-md">
    <NavDrawer />
    <AppBar />
    <v-main class="main" :style="mainPadding">
      <v-container class="main-container">
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
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
    mainPadding() {
      return {
        paddingLeft: this.isNavDrawerOpen ? "260px" : "16px",
      };
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
  background-color: #ECEFF1;
  border-radius: 8px;
  min-height: 100%;
  min-width: 100%;
}
</style>