<template>
  <v-card max-width="600" max-height="200" elevation="3" class="d-flex ma-2">
    <v-row no-gutters class="d-flex flex-nowrap">
      <!-- Left: Image -->
      <div class="image-container">
        <img :src="require('@/assets/book-cover.jpg')" alt="Book Cover" class="cover-img">
      </div>

      <!-- Right: Text Content -->
      <div class="d-flex flex-column overflow-hidden">
        <v-card-text class="card-text">
          <h3 class="book-title mb-2">{{ book.title }}</h3>
          <h5 class="author">{{ book.author }}</h5>

          <v-divider class="my-2"></v-divider>

          <p class="book-description">
            {{ book.description }}
          </p>
        </v-card-text>
      </div>
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
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE */
}

.card-text::-webkit-scrollbar {
  width: 0; /* Hide scrollbar for Chrome, Edge, Safari */
}

.card-text:hover {
  scrollbar-width: thin; /* Show thin scrollbar for Firefox on hover */
  padding-right: 6px;
}

.card-text:hover::-webkit-scrollbar {
  width: 8px; /* Show scrollbar width on hover */
}

.card-text:hover::-webkit-scrollbar-thumb {
  background-color: #42a5f5; /* Scrollbar thumb color */
  border-radius: 4px; /* Rounded edges */
}

.card-text:hover::-webkit-scrollbar-track {
  background-color: #f5f5f5; /* Scrollbar track color */
}

.image-container {
  height: 200px;
  width: 125px;
}

.cover-img {
  height: 200px;
  width: 125px;
  object-fit: fill;
}
</style>