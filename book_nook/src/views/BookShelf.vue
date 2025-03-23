<template>
  <div
    ref="pageContainer" 
  >
    <v-toolbar color="blue-grey-darken-4" title="My Bookshelf" class="border-b" density="compact" elevation="3">
    </v-toolbar>

    <div class="d-flex" :class="containerClass">
      <v-tabs
        v-model="tab"
        color="blue-grey-lighten-1"
        bg-color="blue-grey-darken-4"
        :direction="tabDirection"
      >
        <v-tab prepend-icon="mdi-heart" text="Liked" value="option-1"></v-tab>
        <v-tab prepend-icon="mdi-playlist-edit" text="Reviewed" value="option-2"></v-tab>
        <v-tab prepend-icon="mdi-download" text="Saved" value="option-3"></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="option-1" :class="windowClass" class="pb-4">
          <div class="page-wrapper">
            <div v-for="book in books" class="book-card-wrapper">
              <BookCard
                :key="book.id"
                :title="book.title" 
                :authors="book.author" 
                :description="book.description" 
                :image="book.image" 
              />
            </div>

            <div v-if="books.length % 2 !== 0" class="book-card-spacer"></div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-2" :class="windowClass" class="pb-4">
          <div class="page-wrapper">
            <div v-for="book in books" class="book-card-wrapper">
              <BookCard
                :key="book.id"
                :title="book.title" 
                :authors="book.author" 
                :description="book.description" 
                :image="book.image" 
              />
            </div>
            
            <div v-if="books.length % 2 !== 0" class="book-card-spacer"></div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="option-3" :class="windowClass" class="pb-4">
          <div class="page-wrapper">
            <div v-for="book in books" class="book-card-wrapper">
              <BookCard
                :key="book.id"
                :title="book.title" 
                :authors="book.author" 
                :description="book.description" 
                :image="book.image" 
              />
            </div>
            
            <div v-if="books.length % 2 !== 0" class="book-card-spacer"></div>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script>
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
    books: [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A Jazz Age novel about Gatsby's love for Daisy.", image: require('@/assets/book-cover.jpg') },
      { id: 2, title: "1984", author: "George Orwell", description: "A dystopian novel about a totalitarian society.", image: require('@/assets/book-cover.jpg') },
      { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", description: "A novel about racial injustice in the Deep South.", image: require('@/assets/book-cover.jpg') },
      { id: 4, title: "Pride and Prejudice", author: "Jane Austen", description: "A romantic novel about Elizabeth Bennet and Mr. Darcy.", image: require('@/assets/book-cover.jpg') },
      { id: 5, title: "Moby-Dick", author: "Herman Melville", description: "A whaling adventure about Captain Ahab's obsession.", image: require('@/assets/book-cover.jpg') },
      { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger", description: "A novel about Holden Caulfield's experiences.", image: require('@/assets/book-cover.jpg') },
      { id: 7, title: "Brave New World", author: "Aldous Huxley", description: "A dystopian novel about a futuristic society.", image: require('@/assets/book-cover.jpg') },
      { id: 8, title: "Jane Eyre", author: "Charlotte Brontë", description: "A coming-of-age novel about Jane Eyre's journey.", image: require('@/assets/book-cover.jpg') },
      { id: 9, title: "Crime and Punishment", author: "Fyodor Dostoevsky", description: "A novel about guilt and redemption.", image: require('@/assets/book-cover.jpg') },
    ],
    containerWidth: 0,
  }),

  watch: {
    containerWidth(newWidth) {
      this.updateBooksPerShelf(newWidth);
    }
  },

  mounted() {
    this.containerWidth = this.$refs.pageContainer.clientWidth;
    window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.containerWidth = this.$refs.pageContainer.clientWidth;
    },
    updateBooksPerShelf(containerWidth) {
      if (containerWidth <= 1000) {
        this.tabDirection = "horizontal"
        this.containerClass = "flex-column"
        this.windowClass = "bookshelf-window-sm"
      } else {
        this.tabDirection = "vertical"
        this.containerClass = "flex-row"
        this.windowClass = "bookshelf-window"
      }
    }
  }
};
</script>

<style scoped>
.bookshelf-window {
  max-height: calc(100vh - 112.8px);
  overflow-y: scroll;
  scrollbar-width: thin;
}

.bookshelf-window-sm {
  max-height: calc(100vh - 160.8px);
  overflow-y: scroll;
  scrollbar-width: thin;
}

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