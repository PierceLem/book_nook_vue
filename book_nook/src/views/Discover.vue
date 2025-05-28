<template>
  <div class="page-wrapper">
    <DiscoverDrawer @setGenre="genreSelection($event)" @query="customQuery($event)" />

    <v-card elevation="4" color="indigo" class="search-query py-1 px-2 rounded-lg text-h6">{{ searched }}</v-card>

    <div class="books-container">
      <div v-for="book in books" class="book-card-wrapper">
        <BookCard
          :key="book.id"
          :bookId="book.id"
          :title="book.title" 
          :authors="book.authors" 
          :description="book.description" 
          :thumbnail="book.thumbnail"
          :reviewsCount="book.reviews_count"
          :rating="book.rating"
          :isSaved="book.is_saved"
        />
      </div>
    </div>

    <div v-if="books.length % 2 !== 0" class="book-card-spacer"></div>
  </div>
</template>

<script>
import axios from 'axios';
import BookCard from '@/components/BookCard.vue';
import DiscoverDrawer from '@/components/DiscoverDrawer.vue';

export default {
  name: "Discover",

  components: {
    DiscoverDrawer,
    BookCard,
  },

  data() {
    return {
      searched: "Popular on Book Nook",
      books: [],
    };
  },

  mounted() {
    this.fetchBooks("bestsellers");
  },

  methods: {
    async fetchBooks(query) {
      this.books = [];
      this.loading = true;
      this.error = null;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        const response = await axios.get(
          "/search-books/",
          {
            params: { q: query },
            headers: {
              Authorization: `Token ${token}`, 
            },
          }
        );

        this.books = response.data;
      } catch (err) {
        this.error = "Failed to fetch books.";
      } finally {
        this.loading = false;
      }
    },

    genreSelection(selectedGenre) {
      this.searched = selectedGenre.title;
      this.fetchBooks(selectedGenre.value);
    },

    customQuery(query) {
      if(query) {
        this.searched = query;
        this.fetchBooks(query);
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  position: relative;
  height: calc(100vh - 64px);
}

.search-query {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1000;
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  padding: 56px 0px 0px 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.book-card-wrapper {
  flex-grow: 1;
  flex-basis: 50%;
  height: 358px;
  min-width: 500px;
  max-width: 100%;
  box-sizing: border-box;
  padding-right: 8px;
}

.book-card-spacer {
  flex-grow: 1;
  flex-basis: 50%;
  padding-right: 16px;
  height: 1px;
  min-width: 500px;
  max-width: 100%;
}
</style>