<template>
  <div class="review-container">
    <v-toolbar height="35">
      <v-toolbar-title class="text-body-2">
        Reviews
        
        <v-badge
          color="grey"
          :content=reviews.length
          inline
        ></v-badge>
      </v-toolbar-title>

      <template v-slot:append>
        <v-btn 
          variant="text"
          min-height="35px"
          min-width="35px"
          max-height="35px"
          max-width="35px"
          rounded="0"
          @click="$emit('close')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-toolbar>

    <div class="review-list">
      <v-list class="pt-0">
        <Review
          v-if="reviews.length > 0"
          v-for="review in reviews"
          :reviewId="review.id"
          :user="review.user"
          :text="review.review"
          :rating="review.rating"
          :createdAt="review.created_at"
          :isOwner="review.is_owner"
        />
      </v-list>
      
      <span class="empty-review-text" v-if="!reviews.length > 0">Be the first to write a review!</span>
    </div>

    <div class="review-select border-t" @click="reviewFocus = !reviewFocus">
      <v-btn
        size="xs"
        :append-icon="reviewFocus ? 'mdi-arrow-down' : 'mdi-arrow-up'"
        variant="text"
        text="Write a review"
      >
      </v-btn>
    </div>

    <v-expand-transition>
      <div v-show="reviewFocus" >
        <div class="d-flex align-center flex-column my-auto">
          <span class="text-h6 ml-n3">{{ myRating }}/5</span>

          <v-rating
            v-model="myRating"
            color="yellow-darken-3"
            half-increments
            hover
          ></v-rating>
        </div>

        <v-textarea 
          v-model="myReview"
          rows="1" 
          auto-grow 
          clearable 
          hide-details="auto"
          variant="underlined"
          density="compact"
          max-rows="3"
          label="Write a review"
          :rules="reviewRules"
          :error-messages="ratingError" 
          class="ma-2"
        >
          <template v-slot:append-inner>
            <v-btn 
              height="30"
              width="30"
              icon="mdi-send" 
              variant="text" 
              size="small"
              @click="submitReview"
            >
            </v-btn>
          </template>
        </v-textarea>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import axios from 'axios';
import Review from './Review.vue';

export default {
  name: "Reviews",

  components: {
    Review,
  },

  data() {
    return {
      myReview: "",
      reviewRules: [
        v => !!v || 'Review cannot be blank'
      ],
      myRating: 0,
      ratingError: '',
      reviews: [],
      reviewFocus: false,
    }
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
  },

  methods: {
    async submitReview() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        if (this.myRating === 0) {
          this.ratingError = 'Rating is required';
          return;
        } else {
          this.ratingError = '';
        }

        const response = await axios.post(
          "/add-review/",
          {
            book_data: {
              book_id: this.bookId,
              title: this.title,
              thumbnail: this.thumbnail,
              description: this.description,
              authors: this.authors,
            },
            review: this.myReview,
            rating: this.myRating,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        this.reviews.unshift(response.data);
        this.myReview = '';
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },

    async fetchReviews() {
      try {
        const response = await axios.get(`/reviews/${this.bookId}`);
        console.log("Reviews:", response.data);
        this.reviews = response.data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
        this.reviews = [];
      }
    }
  }
}
</script>

<style scoped>
.review-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
}

.review-list {
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
  scrollbar-width: none;
}

.review-select {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 100%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.empty-review-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

:deep(.v-toolbar__append) {
  margin-inline: auto 0px;
}

:deep(.v-field.v-field--prepended) {
  padding-left: 4px;
}

:deep(.v-toolbar-title) {
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.75rem;
  text-transform: none;
}
</style>