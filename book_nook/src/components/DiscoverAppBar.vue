<template>
  <v-app-bar elevation="0" density="comfortable" class="media-app-bar">
    <div class="h-100 w-100 pt-1 pb-0 pr-2 pl-2">
      <div class="nav-wrapper">
        <div class="text-h5 text-indigo-darken-3 mx-4">{{ setGenre }}</div>
      </div>
    </div>
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
    left: 64px !important;
    width: calc(100% - 64px) !important;
  }
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background-color: #C5CAE9;
  overflow: hidden;
}

.v-app-bar.v-toolbar {
  background-color: rgb(255 255 255 / 0%);
}
</style>