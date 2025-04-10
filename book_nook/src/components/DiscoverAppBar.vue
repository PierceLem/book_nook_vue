<template>
  <v-app-bar elevation="0" density="comfortable" class="border-b media-app-bar">
    <v-app-bar-title>{{ setGenre }}</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "DiscoverAppBar",

  props: ["setGenre"],
}
</script>

<style scoped>
@media (max-width: 700px) {
  .media-app-bar {
    left: 56px !important;
    width: calc(100% - 56px) !important;
  }
}
</style>