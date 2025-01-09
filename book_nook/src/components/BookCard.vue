<template>
  <v-card max-width="400" max-height="200" elevation="3" class="d-flex">
    <v-row no-gutters class="d-flex flex-nowrap">
      <!-- Left: Image -->
      <v-col cols="4" class="d-flex align-stretch">
        <v-img
          src="@/assets/book-cover.jpg"
          cover=""
        ></v-img>
      </v-col>

      <!-- Right: Text Content -->
      <v-col cols="8" class="d-flex flex-column overflow-hidden">
        <v-card-text class="card-text">
          <h3 class="book-title mb-2">{{ book.title }}</h3>
          <h5 class="author">{{ book.author }}</h5>

          <v-divider class="my-2"></v-divider>

          <p class="book-description">
            {{ book.description }}
          </p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "BookCard",
  data() {
    return {
      book: {
        title: "The Great Gatsby",
        author: "J.K. Rowling",
        description:
          "A novel by F. Scott Fitzgerald, set in the Jazz Age on Long Island, near New York City, in the summer of 1922. It tells the story of the enigmatic millionaire Jay Gatsby as he pursues his unrequited love, Daisy Buchanan.",
        image: "@/assets/book-cover.jpg",
      },
    };
  },
};
</script>

<style scoped>
.card-text {
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>