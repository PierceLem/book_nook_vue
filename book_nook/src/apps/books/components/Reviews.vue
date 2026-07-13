<template>
  <div class="review-container">
    <v-toolbar height="35" color="indigo-lighten-5" class="toolbar-border">
      <v-toolbar-title class="text-body-1 text-indigo">
        Reviews
        
        <v-badge
          color="indigo"
          :content=reviews.length
          inline
          class="pl-1"
        ></v-badge>
      </v-toolbar-title>

      <template v-slot:append>
        <v-btn 
          variant="tonal"
          color="indigo"
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

    <div class="review-list-wrapper">
      <v-list class="pt-0 pb-9">
        <Review
          v-if="reviews.length > 0"
          v-for="review in reviews"
          :reviewId="review.id"
          :owner="review.user"
          :isOwner="review.is_owner"
          :text="review.review"
          :rating="review.rating"
          :createdAt="review.created_at"
          @edit-review="overlayValue = true"
          @delete-review="deleteReview"
        />
      </v-list>
      <span class="empty-review-text" v-if="!reviews.length > 0">Be the first to write a review!</span>
    </div>
    
    <v-btn
      icon="mdi-tooltip-edit-outline"
      tile
      color="indigo"
      size="small"
      height="30px"
      width="30px"
      class="write-review-btn"
      @click="overlayValue = true"
    ></v-btn>

    <ReviewCard 
      v-model="overlayValue"
      @review-submitted="addNewReview"
      :myReview="myReview"
      :bookId="bookId" 
      :title="title"
      :authors="authors"
      :description="description"
      :thumbnail="thumbnail"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ReviewCard from './ReviewCard.vue';
import Review from './Review.vue';

export default {
  name: "Reviews",

  components: {
    Review,
    ReviewCard,
  },

  data() {
    return {
      reviews: [],
      myReview: {},
      overlayValue: false,
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
    async fetchReviews() {
      try {
        const response = await axios.get(`/reviews/${this.bookId}`);
        this.reviews = response.data;
        this.myReview = this.reviews.find(r => r.is_owner) || null;
      } catch (error) {
        console.error("Error fetching reviews:", error);
        this.reviews = [];
      }
    },

    async deleteReview(reviewId) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("/review-options/", {
          data: { id: reviewId },
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.reviews = this.reviews.filter(review => review.id !== reviewId);
        this.myReview = null;
        console.log('review deleted');
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    },

    addNewReview(newReview) {
      if (this.reviews.length > 0 && this.reviews[0].is_owner) {
        this.reviews[0] = newReview;
        this.myReview = newReview;
      } else {
        this.reviews.unshift(newReview);
        this.myReview = newReview;
      }
    }
  }
}
</script>

<style scoped>
.review-container {
  display: flex;
  flex-direction: column;
  width: calc(100% - 198px);
  height: 100%;
  background-color: white;
  border-left: solid 1px #E8EAF6;
  border-radius: 8px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1001;
}

.toolbar-border {
  border: solid 1px #C5CAE9;
  border-top-left-radius: 8px;
}

.review-list-wrapper {
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
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

.write-review-btn {
  position: absolute;
  bottom: 4px;
  right: 15px;
  padding-top: 3px;
  z-index: 2001;
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