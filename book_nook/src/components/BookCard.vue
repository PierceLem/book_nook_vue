<template>
  <v-sheet max-width="600" height="200" class="d-flex flex-row ma-2 pb-4" color="transparent">
    <v-col cols="4" class="pa-0 d-flex justify-center align-center">
      <img 
        :src="require('@/assets/book-cover.jpg')" 
        class="book-cover"
        alt="Book Cover"
      />
    </v-col>

    <v-col cols="8" class="d-flex flex-column pa-0 pl-2">
      <h3 class="mb-2">{{ book.title }}</h3>
      <h5 class="text-medium-emphasis">{{ book.author }}</h5>

      <v-divider class="mt-2"></v-divider>

      <p class="book-desc fade-out">
        {{ book.description }}
      </p>
    </v-col>
  </v-sheet>
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
          "A novel by F. Scott Fitzgerald, set in the Jazz Age on Long Island, near New York City, in the summer of 1922. It tells the story of the enigmatic millionaire Jay Gatsby as he pursues his unrequited love, Daisy Buchanan. It tells the story of the enigmatic millionaire Jay Gatsby as he pursues his unrequited love, Daisy Buchanan.",
        image: "@/assets/book-cover.jpg",
      },
    };
  },
};
</script>

<style scoped>
.book-cover {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3), 
              0px 5px 8px rgba(0, 0, 0, 0.3);
  
  transition: box-shadow 0.3s ease-in-out;
}

.book-cover:hover {
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.6), 
              0px 6px 8px rgba(0, 0, 0, 0.55);
              
  cursor: pointer;
}

.book-desc {
  padding-top: 6px;
  padding-bottom: 12px;
  overflow-y: auto;
  scrollbar-width: none;
  font-weight: 400;
  font-size: smaller;
  color: black;
  line-height: 15px;
}

.book-desc::-webkit-scrollbar {
  display: none;
}

.fade-out {
  position: relative;
  max-height: 200px;
  
  -webkit-mask-image: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 1) 10%, 
    rgba(0, 0, 0, 1) 80%, 
    rgba(0, 0, 0, 0) 100%
  );
}
</style>