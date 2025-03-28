<template>
  <v-sheet 
    max-width="600" 
    min-width="100%"
    height="350" 
    elevation="6"
    class="d-flex flex-row ma-0 pa-0" 
    border="sm" 
    rounded="lg" 
    style="overflow: hidden;"
  >
    <div class="detail-container">
      <div class="d-flex flex-row flex-grow-1 h-100 py-4 pl-2">
        <v-col 
          cols="4" 
          class="px-2 py-0 d-flex justify-center align-center"
        >
          <img 
            :src="image" 
            class="book-cover"
            alt="Book Cover"
          />
        </v-col>

        <v-col 
          cols="8"
          class="d-flex flex-column py-0 pl-2"
        >
          <h3>{{ title }}</h3>
          <h5 class="text-medium-emphasis">{{ authors.length ? authors.join(", ") : "Unknown Author" }}</h5>

          <v-divider class="mt-2"></v-divider>

          <p class="book-desc fade-out">
            {{ description ? description : "No description available" }}
          </p>
        </v-col>
      </div>

      <v-expand-transition>
        <Reviews 
          v-show="openReviews" 
          @close="openReviews = false" 
          :bookId="bookId" 
          :title="title" 
          ref="reviewList"
        />
      </v-expand-transition>
    </div>

    <v-divider vertical class="pa-0 ma-0"></v-divider>

    <div class="options">
      <v-btn 
        :color="localBookLiked ? 'red' : ''"
        variant="text"
        min-height="48px"
        min-width="35px"
        max-height="48px"
        max-width="35px"
        stacked
        rounded="0"
        @click="toggleLike"
      >
        <v-icon>{{ localBookLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        <span class="likes-number">{{ localBookLikes }}</span>
      </v-btn>

      <v-btn 
        variant="text"
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
            Add to bookshelf
          </span>
        </v-tooltip>

        <v-icon>mdi-book-plus-outline</v-icon>
      </v-btn>

      <v-btn 
        variant="text"
        min-height="35px"
        min-width="35px"
        max-height="35px"
        max-width="35px"
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

        <v-icon>mdi-message-bulleted</v-icon>
      </v-btn>

      <v-btn 
        variant="text"
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
  </v-sheet>
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
      localBookLiked: this.bookLiked,
      localBookLikes: this.bookLikes,
      openReviews: false,
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
    image: {
      type: String,
      required: true,
    },
    bookLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    bookLiked: {
      type: Boolean,
      required: true,
      default: false,
    }
  },

  methods: {
    async toggleLike() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        const response = await axios.post(
          `/like-book/${this.bookId}/`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        
        this.localBookLikes = response.data.likes;
        this.localBookLiked = response.data.liked;
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
  max-height: 100%;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.book-desc {
  padding: 6px 0px;
  padding-right: 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  font-weight: 400;
  font-size: smaller;
  color: black;
  line-height: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 35px;
  height: 100%;
}

.gradient-bg {
  background: linear-gradient(to top, #EEEEEE, #ffffff);
}

.detail-container {
  width: calc(100% - 35px);
  height: 100%;
  position: relative;
}

.likes-number {
  font-size: x-small;
  opacity: 60%;
}
</style>
