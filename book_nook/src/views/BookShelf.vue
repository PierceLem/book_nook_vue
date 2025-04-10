<template>
  <div
    ref="pageContainer" 
    class="h-100 w-100"
  >
    <v-toolbar title="My Bookshelf" color="white" class="border-b" density="compact">
    </v-toolbar>

    <div class="d-flex tabs-wrapper" :class="containerClass">
      <v-tabs
        v-model="tab"
        :direction="tabDirection"
      >
        <v-tab prepend-icon="mdi-playlist-edit" text="Reviewed" value="option-1"></v-tab>
        <v-tab prepend-icon="mdi-download" text="Saved" value="option-2"></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" class="w-100 h-100">
        <v-tabs-window-item value="option-1" :class="windowClass" class="pb-4 h-100">
          <div class="page-wrapper">
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
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-2" :class="windowClass" class="pb-4 h-100">
          <div class="page-wrapper">
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
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BookCard from '@/components/BookCard.vue';

export default {
  name: "BookShelf",

  components: {
    BookCard,
  },

  data: () => ({
    tab: 'option-1',
    tabDirection: null,
    containerClass: null,
    windowClass: null,
    reviewedBooks: [],
    savedBooks: [],
    containerWidth: 0,
  }),

  watch: {
    containerWidth(newWidth) {
      this.updateTabOrientation(newWidth);
    }
  },

  mounted() {
    this.containerWidth = this.$refs.pageContainer.clientWidth;
    window.addEventListener("resize", this.onResize);
    this.fetchUserBooks();
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.containerWidth = this.$refs.pageContainer.clientWidth;
    },
    updateTabOrientation(containerWidth) {
      if (containerWidth <= 1000) {
        this.tabDirection = "horizontal"
        this.containerClass = "flex-column"
        this.windowClass = "bookshelf-window-sm"
      } else {
        this.tabDirection = "vertical"
        this.containerClass = "flex-row"
        this.windowClass = "bookshelf-window"
      }
    },
    async fetchUserBooks() {
      console.log("fetching books");
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
.bookshelf-window {
  max-height: calc(100vh - 112.8px);
  overflow-y: auto;
  scrollbar-width: thin;
}

.bookshelf-window-sm {
  max-height: calc(100vh - 160.8px);
  overflow-y: auto;
  scrollbar-width: thin;
}

.page-wrapper {
  padding: 16px 0px 0px 16px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}

.tabs-wrapper {
  height: calc(100vh - 112.8px);
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