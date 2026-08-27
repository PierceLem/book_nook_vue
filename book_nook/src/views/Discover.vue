<template>
  <div class="page-wrapper">
    <DiscoverDrawer @setGenre="genreSelection($event)" @query="customQuery($event)" />

    <v-card 
      elevation="4" 
      color="indigo" 
      class="search-query py-1 px-2 text-h6"
    >{{ query? query : filter }}</v-card>

    <div class="books-container">
      <div v-for="book in books" class="book-card-wrapper">
        <BookCard
          :key="book.id"
          :book="book"
        />
      </div>

      <div class="d-flex w-100 align-center justify-center mb-2" v-if="books.length < totalBooks">
        <v-btn
          color="indigo"
          @click="loadMoreBooks"
        >
          Load More
        </v-btn>
      </div>
    </div>

    <div v-if="books.length % 2 !== 0" class="book-card-spacer"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BookCard from '@/apps/main/components/BookCard.vue';
import DiscoverDrawer from '@/apps/books/DiscoverDrawer.vue';

export default {
  name: "Discover",

  components: {
    DiscoverDrawer,
    BookCard,
  },

  computed: {
    ...mapState("bookStore", ["books", "query", "filter"]),
  },  

  mounted() {
    this.$store.dispatch("bookStore/searchBooks", {
      query: "Harry Potter",
      reset: true,
    });
  },

  methods: {
  }
};
</script>

<style scoped>
.page-wrapper {
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  padding: 8px;
}

.search-query {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1000;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  padding: 48px 0px 0px 8px;
  border-radius: 8px;
  border: solid 2px #E8EAF6;
  background-color: #E8EAF6;
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