<template>
  <v-snackbar
    v-model="snackbar.visible"
    vertical
    location="bottom end"
    :color="snackbar.color"
  >
    <v-list-item
      density="compact"
      slim
      class="pa-0"
    >
      <template v-slot:prepend>
        <v-icon
          :icon="snackbar.icon"
          size="40px"
          class="opacity-100"
        ></v-icon>
      </template>

      <v-list-item-title>{{ snackbar.subject }}</v-list-item-title>

      <v-list-item-subtitle>{{ snackbar.content }}</v-list-item-subtitle>
    </v-list-item>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",

  computed: {
    snackbar() {
      return this.$store.state.ui.snackbar;
    }
  },
};
</script>