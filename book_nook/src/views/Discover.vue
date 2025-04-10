<template>
  <div class="page-wrapper">
    <DiscoverDrawer @setGenre="genreSelection($event)" @query="customQuery($event)" />

    <DiscoverAppBar :setGenre="searched" />

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
    <div v-if="books.length % 2 !== 0" class="book-card-spacer"></div>
  </div>
</template>

<script>
import axios from 'axios';
import DiscoverAppBar from '@/components/DiscoverAppBar.vue';
import BookCard from '@/components/BookCard.vue';
import DiscoverDrawer from '@/components/DiscoverDrawer.vue';

export default {
  name: "Discover",

  components: {
    DiscoverAppBar,
    DiscoverDrawer,
    BookCard,
  },

  data() {
    return {
      searched: "Popular Books",
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
  padding: 16px 0px 0px 16px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  width: 100%;
}

.book-card-wrapper {
  flex-grow: 1;
  flex-basis: 50%;
  padding-right: 16px;
  height: 366px;
  min-width: 500px;
  max-width: 100%;
  box-sizing: border-box;
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