<template>
  <v-layout class="rounded rounded-md">
    <NavDrawer />
    <AppBar />
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-container></v-container>
    </v-main>
  </v-layout>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
import AppBar from "@/components/AppBar.vue";

export default {
  components: {
    NavDrawer,
    AppBar,
  },
};
</script>
