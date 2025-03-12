<template>
  <div class="page-wrapper">
    <DiscoverDrawer @setGenre="genre = $event" @drawerToggle="onResize" />

    <DiscoverAppBar :setGenre="genre" />

    <div ref="pageContainer">
      <div
        v-for="(shelf, index) in shelves" 
        :key="index" 
        class="books-wrapper" 
      >
        <v-col v-for="book in shelf" :cols="shelfWidth" class="d-flex flex-row justify-between w-100 ma-0 pa-0 pr-4">
          <BookCard
            :key="book.id"
            :title="book.title" 
            :author="book.author" 
            :description="book.description" 
            :image="book.image" 
          />
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
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
      genre: "Popular Books",
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
      booksPerShelf: 3,
      shelfWidth: 4,
      containerWidth: 0,
    };
  },

  computed: {
    shelves() {
      return this.books.reduce((acc, book, index) => {
        const shelfIndex = Math.floor(index / this.booksPerShelf);
        if (!acc[shelfIndex]) acc[shelfIndex] = [];
        acc[shelfIndex].push(book);
        return acc;
      }, []);
    }
  },

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
      this.$nextTick(() => {
        this.containerWidth = this.$refs.pageContainer.clientWidth;
      })
    },
    updateBooksPerShelf(containerWidth) {
      if (containerWidth <= 850) {
        this.booksPerShelf = 1;
        this.shelfWidth = 12;
      } else {
        this.booksPerShelf = 2;
        this.shelfWidth = 6;
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100%;
}

.books-wrapper {
  display: flex;
  flex-direction: row;
  padding: 8px 0px 8px 16px;
  width: 100%;
  max-width: 100%;
  max-height: 266px;
}
</style>