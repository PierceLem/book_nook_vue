<template>
  <v-snackbar
    v-model="visible"
    vertical
    timeout="5000"
    location="bottom end"
    :color="color"
  >
    <v-list-item
      density="compact"
      slim
      class="pa-0"
    >
      <template v-slot:prepend>
        <v-icon
          :icon="icon"
          size="40px"
          class="opacity-100"
        ></v-icon>
      </template>

      <v-list-item-title>{{ subject }}</v-list-item-title>

      <v-list-item-subtitle>{{ content }}</v-list-item-subtitle>
    </v-list-item>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",

  data() {
    return {
      visible: false,
      subject: '',
      content: '',
      icon: '',
      color: '',
    }
  },

  methods: {
    show(snackbarData) {
      this.subject = snackbarData.subject;
      this.content = snackbarData.content;
      this.icon = snackbarData.icon;
      this.color = snackbarData.color;
      this.visible = true;
    }
  }
};
</script>