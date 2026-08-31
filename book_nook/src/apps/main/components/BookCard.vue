<template>
  <v-card 
    max-width="600" 
    min-width="100%"
    variant="flat"
    rounded="lg"
    height="350" 
    class="d-flex ma-0" 
    style="overflow: hidden; border: 2px solid #E8EAF6;"
  >
    <div class="detail-container bg-white">
      <div class="options-container">
        <v-btn 
          variant="text"
          color="indigo"
          min-height="35px"
          min-width="35px"
          max-height="35px"
          max-width="35px"
          stacked
          rounded="0"
        >
          <v-tooltip
            location="left" 
            activator="parent" 
            offset="5"
            open-delay="800"
          >
            <span class="text-caption">
              Send to thread
            </span>
          </v-tooltip>

          <v-icon size="18px" class="pt-1">mdi-message-arrow-left-outline</v-icon>

          <ThreadSelector @selectedBook="sendBook" />
        </v-btn>

        <v-btn 
          :color="book.is_saved ? 'green-accent-4' : 'indigo'"
          variant="text"
          min-height="35px"
          min-width="35px"
          max-height="35px"
          max-width="35px"
          rounded="0"
          @click="saveBook"
        >
          <v-tooltip
            location="left" 
            activator="parent" 
            offset="5"
            open-delay="800"
          >
            <span class="text-caption">
              Save to bookshelf
            </span>
          </v-tooltip>

          <v-icon :icon="book.is_saved ? 'mdi-book-check-outline' : 'mdi-book-plus-outline'"></v-icon>
        </v-btn>
      </div>

      <div class="ratings-container">
        <template v-if="book.average_rating">
          <div class="text-h6 mb-1 text-indigo" style="height: 23px;">
            {{ book.average_rating }}
            <span class="text-caption text-indigo">/5</span>
          </div>

          <v-rating
            :model-value="book.average_rating"
            color="indigo"
            active-color="yellow-darken-3"
            size="x-small"
            density="comfortable"
            half-increments
            readonly
            style="height: 20px;"
          ></v-rating>
        </template>

        <div v-if="!book.average_rating" class="text-h6 my-2 text-indigo" style="height: 23px;">
          0
          <span class="text-caption text-indigo">ratings</span>
        </div>
        
        <v-btn
          variant="text"
          color="indigo"
          size="small"
          density="comfortable"
          class="px-1 my-1"
          @click="loadReviews"
        >
          <span v-if="book.review_count > 0" class="text-caption">{{ book.review_count }} ratings</span>
          <span v-else class="text-caption">Write a review</span>
        </v-btn>
      </div>

      <div class="cover-img-container">
        <img 
          :src="book.thumbnail" 
          class="book-cover"
          alt="Book Cover"
        />
      </div>

      <div class="book-info-container">
        <div class="book-header">
          <h3
            ref="titleRef"
            class="text-indigo book-title"
            :class="{ 'scrolling': isTitleOverflowing }"
          >
            <span class="scroll-inner">{{ book.title }}</span>
          </h3>

          <h5
            ref="authorRef"
            class="text-indigo book-authors"
            style="opacity: 0.75;"
            :class="{ 'scrolling': isAuthorOverflowing }"
          >
            <span class="scroll-inner">
              {{ book.authors.length ? book.authors.join(", ") : "Unknown Author" }}
            </span>
          </h5>
        </div>

        <p class="book-desc pl-3">
          {{ book.description ? book.description : "No description available" }}
        </p>
      </div>

      <v-expand-x-transition>
        <Reviews 
          v-show="openReviews" 
          @close="openReviews = false" 
          :book="book" 
          ref="reviewList"
        />
      </v-expand-x-transition>
    </div>
  </v-card>
</template>

<script>
import ThreadSelector from '@/apps/books/components/ThreadSelector.vue';
import Reviews from '@/apps/books/components/Reviews.vue';

export default {
  name: "BookCard",

  components: {
    Reviews,
    ThreadSelector,
  },

  data() {
    return {
      openReviews: false,
      isTitleOverflowing: false,
      isAuthorOverflowing: false,
    };
  },

  props: {
    book: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.checkOverflow();
    window.addEventListener('resize', this.checkOverflow);

    this.titleObserver = new ResizeObserver(this.checkOverflow);
    this.authorObserver = new ResizeObserver(this.checkOverflow);

    this.titleObserver.observe(this.$refs.titleRef);
    this.authorObserver.observe(this.$refs.authorRef);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkOverflow);
    this.titleObserver?.disconnect();
    this.authorObserver?.disconnect();
  },

  methods: {
    checkOverflow() {
      const title = this.$refs.titleRef;
      const authors = this.$refs.authorRef;
      const scrollSpeed = 80;

      if (title && title.scrollWidth > title.clientWidth) {
        this.isTitleOverflowing = true;

        const titleDistance = title.scrollWidth - title.clientWidth;
        const titleDuration = titleDistance / scrollSpeed;

        title.style.setProperty('--title-scroll-distance', `-${titleDistance}px`);
        title.style.setProperty('--title-scroll-duration', `${titleDuration}s`);
      } else {
        this.isTitleOverflowing = false;
      }

      if (authors && authors.scrollWidth > authors.clientWidth) {
        this.isAuthorOverflowing = true;

        const authorsDistance = authors.scrollWidth - authors.clientWidth;
        const authorsDuration = authorsDistance / scrollSpeed;

        authors.style.setProperty('--author-scroll-distance', `-${authorsDistance}px`);
        authors.style.setProperty('--author-scroll-duration', `${authorsDuration}s`);
      } else {
        this.isAuthorOverflowing = false;
      }
    },

    loadReviews() {
      this.$store.dispatch("bookStore/fetchReviews", this.book.id);
      this.openReviews = true;
    },

    saveBook() {
      this.$store.dispatch("bookStore/saveBook", { book: this.book });
    },
  }
};
</script>

<style scoped>
.book-cover {
  max-width: 100%;
  max-height: calc(100% - 35px);
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  z-index: 1001;
}

.cover-img-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  min-width: 190px;
  max-width: 190px;
  height: 100%;
}

.book-info-container {
  display: flex;
  flex-direction: column;
  width: calc(100% - 190px);
}

.book-desc {
  padding: 6px 0px;
  padding-right: 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(26, 35, 126, 0.5) transparent;
  font-weight: 400;
  font-size: smaller;
  color: black;
  line-height: 20px;
  z-index: 1001;
}

.book-header {
  display: flex;
  flex-direction: column;
  width: calc(100% - 102px);
  min-height: 75px;
  padding-top: 15px;
  padding-left: 4px;
}

.book-title,
.book-authors {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  max-width: 100%;
  padding-left: 6px;
  display: block;
  mask-image: linear-gradient(to right, transparent 0px, black 8px, black calc(100% - 8px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0px, black 8px, black calc(100% - 8px), transparent 100%);
}

.scroll-inner {
  display: inline-block;
}

.book-title::-webkit-scrollbar,
.book-authors::-webkit-scrollbar {
  display: none;
}

.scrolling.book-title:hover .scroll-inner {
  animation: scroll-title var(--title-scroll-duration) linear forwards;
}

.scrolling.book-authors:hover .scroll-inner {
  animation: scroll-author var(--author-scroll-duration) linear forwards;
}

@keyframes scroll-title {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(var(--title-scroll-distance));
  }
}

@keyframes scroll-author {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(var(--author-scroll-distance));
  }
}

.options-container {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}

.ratings-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  z-index: 1001;
}

.detail-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.rating {
  font-size: x-small;
  opacity: 60%;
}
</style>
