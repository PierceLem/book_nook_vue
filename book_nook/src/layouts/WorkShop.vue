<template>
  <div class="workshop">
    <v-card max-width="600" max-height="200" elevation="3" class="d-flex ma-8">
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
  </div>
</template>

<script>
export default {
  name: "WorkShop",
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
.workshop {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card-text {
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
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