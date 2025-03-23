<template>
  <div class="page-wrapper">
    <DiscoverDrawer @setGenre="genreSelection($event)" @query="customQuery($event)" />

    <DiscoverAppBar :setGenre="searched" />

    <div v-for="book in books" class="book-card-wrapper">
      <BookCard
        :key="book.id"
        :id="book.id"
        :title="book.title" 
        :authors="book.authors" 
        :description="book.description" 
        :image="book.thumbnail" 
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
        const response = await axios.get("http://127.0.0.1:8000/search-books/", {
          params: { q: query },
        });

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