<template>
  <v-list class="pt-0">
    <v-list-item 
      v-for="n in 10" 
      :key="n"
      color="grey-lighten-4"
      prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
      density="compact"
      class="border-b"
    >
      <v-toolbar height="25" color="white">
        <v-toolbar-title class="ml-0">Username</v-toolbar-title>

        <template v-slot:append>
          <span class="text-caption">Date</span>
        </template>
      </v-toolbar>

      <span class="text-review">{{ review }}</span>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Review",

  data() {
    return {
      review: "This book is a compelling read, offering a unique perspective and engaging storytelling that keeps the reader invested from start to finish. The characters are well-developed, and the themes explored resonate on multiple levels. Whether you're looking for entertainment, insight, or inspiration, this book delivers. A must-read for anyone who appreciates a well-crafted narrative!",
      
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