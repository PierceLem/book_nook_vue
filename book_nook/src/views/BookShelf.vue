<template>
  <div
    ref="pageContainer" 
    class="page-wrapper"
  >
    <div class="bookshelf-toolbar">
      <span class="text-h5 text-indigo">My Bookshelf</span>
    </div>

    <div class="tabs-wrapper">
      <v-tabs
        v-model="tab"
        align-tabs="center"
        color="indigo"
        direction="horizontal"
      >
        <v-tab prepend-icon="mdi-playlist-edit" text="Reviewed" value="option-1"></v-tab>
        <v-tab prepend-icon="mdi-download" text="Saved" value="option-2"></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" class="bookshelf-wrapper">
        <v-tabs-window-item value="option-1" class="bookshelf-window">
          <div class="window-wrapper">
            <div v-for="book in reviewedBooks" class="book-card-wrapper">
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
            
            <div v-if="reviewedBooks.length % 2 !== 0" class="book-card-spacer"></div>

            <div v-if="reviewedBooks.length === 0" class="placeholder-img-box">
              <img :src="require('@/assets/undraw_reviews.svg')" class="placeholder-img"></img>
              <span class="text-h5 text-indigo mt-4">No Reviews</span>
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-2" class="bookshelf-window">
          <div class="window-wrapper">
            <div v-for="book in savedBooks" class="book-card-wrapper">
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
            
            <div v-if="savedBooks.length % 2 !== 0" class="book-card-spacer"></div>

            <div v-if="savedBooks.length === 0" class="placeholder-img-box">
              <img :src="require('@/assets/undraw_saved.svg')" class="placeholder-img"></img>
              <span class="text-h5 text-indigo mt-4">No Saved Books</span>
            </div>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BookCard from '@/apps/main/components/BookCard.vue';

export default {
  name: "BookShelf",

  components: {
    BookCard,
  },

  data: () => ({
    tab: 'option-1',
    reviewedBooks: [],
    savedBooks: [],
  }),

  mounted() {
    this.fetchUserBooks();
  },

  methods: {
    async fetchUserBooks() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        const response = await axios.get(
          "/bookshelf/",
          {
            headers: {
              Authorization: `Token ${token}`, 
            },
          }
        );
        this.reviewedBooks = response.data.reviewed_books;
        this.savedBooks = response.data.saved_books;
      } catch (err) {
        this.error = "Failed to fetch books.";
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  width: 100%;
  padding: 8px;
}

.bookshelf-window {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.bookshelf-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  min-height: 0;
  border-radius: 8px;
  background-color: #E8EAF6;
  border: 2px solid #E8EAF6;
}

.bookshelf-toolbar {
  display: flex;
  justify-content: center;
  width: 100%;
}

.window-wrapper {
  padding: 8px 0px 0px 8px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}

.tabs-wrapper {
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  justify-content: center;
}

.book-card-wrapper {
  flex-grow: 1;
  flex-basis: 50%;
  padding-right: 8px;
  height: 358px;
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

.placeholder-img-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.placeholder-img {
  height: 35%;
}

:deep(.v-window__container) {
  width: 100%;
}
</style>