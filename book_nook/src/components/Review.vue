<template>
  <v-list-item 
    color="grey-lighten-4"
    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
    density="compact"
    class="border-b"
  >
    <v-toolbar height="25" color="white">
      <v-toolbar-title class="ml-0">{{ user }}</v-toolbar-title>

      <template v-slot:append>
        <span class="text-caption">{{ createdAt }}</span>
      </template>
    </v-toolbar>

    <span class="text-review">{{ text }}</span>
  </v-list-item>
</template>

<script>
export default {
  name: "Review",

  props: {
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.text-review {
  display: block;
  max-height: 100px;
  overflow-y: auto;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 15px;
  opacity: 75%;
}

:deep(.v-toolbar-title) {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 25px;
  text-transform: none;
}
</style>