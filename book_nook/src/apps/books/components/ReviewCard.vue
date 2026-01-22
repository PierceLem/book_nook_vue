<template>
  <v-overlay
    :model-value="modelValue"
    @update:modelValue="closeForm"
    contained
    class="align-center justify-center"
    style="z-index: 2002;"
  >
    <v-card
      variant="outlined"
      rounded="lg"
      color="indigo"
      class="d-flex flex-column align-center pa-3 bg-white"
    >
      <h5>{{ myReview ? 'Edit my review' : 'Leave a review' }}</h5>

      <v-rating 
        v-model="rating"
        active-color="yellow-accent-4"
        half-increments
        hover  
      ></v-rating>

      <v-textarea 
        v-model="review"
        variant="underlined" 
        density="compact"
        min-width="330"
        rows="1" 
        auto-grow 
        clearable 
        hide-details="auto"
        max-rows="4"
        :error-messages="errors"
        @update:focused="errors = ''"
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-send"
            tile
            size="35px"
            rounded="lg"
            variant="tonal"
            color="indigo"
            @click="submitReview"
          ></v-btn>
        </template>
      </v-textarea>
    </v-card>
  </v-overlay>
</template>

<script>
import axios from 'axios';

export default {
  name: "ReviewCard",

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    myReview: {
      type: Object,
      default: {},
    },
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
      required: false,
    },
  },

  data() {
    return {
      review: '',
      rating: null,
      errors: '',
    }
  },

  watch: {
    myReview: {
      immediate: true,
      handler(newReview) {
        this.review = newReview?.review || '';
        this.rating = newReview?.rating || 0;
      }
    }
  },

  methods: {
    async submitReview() {
      try {
        const token = localStorage.getItem("token");

        if (!this.rating) {
          this.errors = 'Rating is required';
          return;
        } else if (!this.review) {
          this.errors = 'Review is required';
          return;
        } else {
          this.errors = '';
        }

        const response = await axios.post(
          "/review-options/",
          {
            book_data: {
              book_id: this.bookId,
              title: this.title,
              thumbnail: this.thumbnail,
              description: this.description,
              authors: this.authors,
            },
            review: this.review,
            rating: Math.round(this.rating * 2),
            id: this.myReview ? this.myReview.id : '',
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        this.$emit('update:modelValue', false);
        this.$emit('review-submitted', response.data);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },

    closeForm() {
      this.$emit('update:modelValue', false);
      this.review = this.myReview ? this.myReview.review : '';
      this.rating = this.myReview ? this.myReview.rating : 0;
    }
  }
};
</script>

<style scoped>
</style>