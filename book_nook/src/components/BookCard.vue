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
      <div class="d-flex flex-row flex-grow-1 h-100 pt-4 pl-2">
        <v-col 
          cols="4" 
          class="pa-0 pb-4 d-flex justify-center align-start"
        >
          <img 
            :src="image" 
            class="book-cover"
            alt="Book Cover"
          />
        </v-col>

        <v-col 
          cols="8" 
          class="d-flex flex-column pa-0 pl-2"
        >
          <h3>{{ title }}</h3>
          <h5 class="text-medium-emphasis">{{ author }}</h5>

          <v-divider class="mt-2"></v-divider>

          <p class="book-desc fade-out">
            {{ description }}
          </p>
        </v-col>
      </div>

      <v-expand-transition>
        <Reviews v-show="openReviews" @close="openReviews = false" :title="title" />
      </v-expand-transition>
    </div>

    <v-divider vertical class="pa-0 ma-0"></v-divider>

    <div class="options">
      <v-btn 
        :color="liked ? 'red' : ''"
        variant="text"
        min-height="35px"
        min-width="35px"
        max-height="35px"
        max-width="35px"
        rounded="0"
        @click="toggleLike"
      >
        <v-icon>{{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
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
        @click="openReviews = true"
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
import Reviews from './Reviews.vue';

export default {
  name: "BookCard",

  components: {
    Reviews,
  },

  data() {
    return {
      liked: false,
      openReviews: false,
    };
  },

  props: {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },

  methods: {
    toggleLike() {
      this.liked = !this.liked;
    },
  },
};
</script>

<style scoped>
.book-cover {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3), 
              0px 5px 8px rgba(0, 0, 0, 0.3);
}

.book-desc {
  padding: 6px 0px;
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
</style>
