<template>
  <v-card 
    max-width="600" 
    min-width="100%"
    variant="flat"
    rounded="lg"
    height="350" 
    class="d-flex ma-0 pa-1 bg-indigo-lighten-4" 
    style="overflow: hidden;"
  >
    <div class="detail-container bg-indigo-lighten-5">
      <div class="options-chamfer-wrapper-bl-1">
        <div class="options-chamfer-bl"></div>
      </div>

      <div class="options-chamfer-wrapper-bl-2">
        <div class="options-chamfer-bl"></div>
      </div>

      <div class="options-container">
        <v-btn 
          variant="text"
          color="indigo-accent-4"
          min-height="35px"
          min-width="35px"
          max-height="35px"
          max-width="35px"
          stacked
          rounded="0"
          @click="loadReviews"
        >
          <v-tooltip
            location="left" 
            activator="parent" 
            offset="5"
            open-delay="800"
          >
            <span class="text-caption">
              Reviews
            </span>
          </v-tooltip>

          <v-icon size="18px" class="pt-1">mdi-message-bulleted</v-icon>
        </v-btn>

        <v-btn 
          :color="localIsSaved ? 'green-accent-4' : 'indigo-accent-4'"
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

          <v-icon :icon="localIsSaved ? 'mdi-book-check-outline' : 'mdi-book-plus-outline'"></v-icon>
        </v-btn>

        <v-btn 
          variant="text"
          color="indigo-accent-4"
          min-height="35px"
          min-width="35px"
          max-height="35px"
          max-width="35px"
          rounded="0"
        >
          <v-tooltip
            location="left" 
            activator="parent" 
            offset="5"
            open-delay="800"
          >
            <span class="text-caption">
              Recommend to a friend
            </span>
          </v-tooltip>

          <v-icon>mdi-account-arrow-left-outline</v-icon>
        </v-btn>
      </div>

      <div class="ratings-chamfer-wrapper-tr-1">
        <div class="ratings-chamfer-tr"></div>
      </div>

      <div class="ratings-chamfer-wrapper-tr-2">
        <div class="ratings-chamfer-tr"></div>
      </div>

      <div class="ratings-container">
        <div class="text-h6 mb-1 text-indigo-darken-3" style="height: 23px;">
          3.5
          <span class="text-caption text-indigo-darken-3">/5</span>
        </div>

        <v-rating
          model-value="3.5"
          color="white"
          active-color="yellow-accent-4"
          size="x-small"
          density="comfortable"
          half-increments
          readonly
          style="height: 20px;"
        ></v-rating>

        <v-btn
          variant="text"
          color="indigo-accent-4"
          size="small"
          density="comfortable"
          class="px-1 my-1"
        >
          <span class="text-caption">15 ratings</span>
        </v-btn>
      </div>

      <div class="cover-img-container">
        <img 
          :src="thumbnail" 
          class="book-cover"
          alt="Book Cover"
        />
      </div>

      <div class="book-info-container">
        <div class="book-header">
          <h3
            ref="titleRef"
            class="text-indigo-darken-3 book-title"
            :class="{ 'scrolling': isTitleOverflowing }"
          >
            <span class="scroll-inner pl-2">{{ title }}</span>
          </h3>

          <h5
            ref="authorRef"
            class="text-indigo-lighten-2 book-authors"
            :class="{ 'scrolling': isAuthorOverflowing }"
          >
            <span class="scroll-inner pl-2">
              {{ authors.length ? authors.join(", ") : "Unknown Author" }}
            </span>
          </h5>
        </div>

        <p class="book-desc pl-2">
          {{ description ? description : "No description available" }}
        </p>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';
import Reviews from './Reviews.vue';

export default {
  name: "BookCard",

  components: {
    Reviews,
  },

  data() {
    return {
      localIsSaved: this.isSaved,
      openReviews: false,
      isTitleOverflowing: false,
      isAuthorOverflowing: false,
    };
  },

  props: {
    bookId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: Array,
      required: true,
      default: () => [],
    },
    description: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    reviewsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: false,
    },
    isSaved: {
      type: Boolean,
      required: true,
    }
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
        const titleSpeed = titleDistance / scrollSpeed;

        title.style.setProperty('--title-scroll-distance', `-${titleDistance}px`);
        title.style.setProperty('--title-scroll-duration', `${titleSpeed}s`);
      } else {
        this.isTitleOverflowing = false;
        title.style.removeProperty('--title-scroll-distance');
        title.style.removeProperty('--title-scroll-duration');
      }

      if (authors && authors.scrollWidth > authors.clientWidth) {
        this.isAuthorOverflowing = true;

        const authorsDistance = authors.scrollWidth - authors.clientWidth;
        const authorsSpeed = authorsDistance / scrollSpeed;

        authors.style.setProperty('--author-scroll-distance', `-${authorsDistance}px`);
        authors.style.setProperty('--author-scroll-duration', `${authorsSpeed}s`);
      } else {
        this.isAuthorOverflowing = false;
        authors.style.removeProperty('--author-scroll-distance');
        authors.style.removeProperty('--author-scroll-duration');
      }
    },

    async saveBook() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        const response = await axios.post(
          `/toggle-save-book/`,
          {
            book_data: {
              book_id: this.bookId,
              title: this.title,
              thumbnail: this.thumbnail,
              description: this.description,
              authors: this.authors,
            }
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        
        this.localIsSaved = response.data.is_saved;
      } catch (error) {
        console.error("Error liking/unliking book:", error);
      }
    },

    loadReviews() {
      this.openReviews = true;
      this.$refs.reviewList.fetchReviews();
    }
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
  padding-top: 6px;
}

.book-title,
.book-authors {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  max-width: 100%;
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
  border-top-right-radius: 8px;
  background-color: #C5CAE9;
  overflow: hidden;
}

.ratings-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 8px;
  background-color: #C5CAE9;
  overflow: hidden;
}

/* css for applying chamfers to the content in the corners of the book cards */
  .options-chamfer-wrapper-bl-1 {
    position: absolute;
    bottom: 35px;
    left: 0px;
    height: 8px;
    width: 8px;
    background-color: #C5CAE9;
  }

  .options-chamfer-wrapper-bl-2 {
    position: absolute;
    bottom: 0px;
    left: 105px;
    height: 8px;
    width: 8px;
    background-color: #C5CAE9;
  }

  .options-chamfer-bl {
    height: 100%;
    width: 100%;
    border-bottom-left-radius: 100%;
    background-color: #E8EAF6;
    z-index: 1000;
  }

  .ratings-chamfer-wrapper-tr-1 {
    position: absolute;
    top: 0px;
    right: 100px;
    height: 8px;
    width: 8px;
    background-color: #C5CAE9;
  }

  .ratings-chamfer-wrapper-tr-2 {
    position: absolute;
    top: 75px;
    right: 0px;
    height: 8px;
    width: 8px;
    background-color: #C5CAE9;
    z-index: 1000;
  }

  .ratings-chamfer-tr {
    height: 100%;
    width: 100%;
    border-top-right-radius: 100%;
    background-color: #E8EAF6;
  }
/* */

.detail-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.rating {
  font-size: x-small;
  opacity: 60%;
}
</style>
