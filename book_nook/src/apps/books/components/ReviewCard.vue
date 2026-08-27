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

      <v-form ref="form" class="w-100 d-flex flex-column align-center">
        <v-rating 
          v-model="rating"
          active-color="yellow-accent-4"
          half-increments
          hover  
        ></v-rating>
        <span v-if="ratingError" class="text-error text-caption">{{ ratingError }}</span>

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
          :rules="reviewRules"
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-send"
              tile
              size="35px"
              rounded="lg"
              variant="tonal"
              color="indigo"
              :loading="submitting"
              @click="submitReview"
            ></v-btn>
          </template>
        </v-textarea>
      </v-form>
    </v-card>
  </v-overlay>
</template>
<script>
export default {
  name: "ReviewCard",

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    myReview: {
      type: Object,
      default: () => ({}),
    },
    book: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      review: '',
      rating: null,
      ratingError: '',
      submitting: false,
    }
  },

  computed: {
    reviewRules() {
      return [(v) => !!v || 'Review is required'];
    },
  },

  watch: {
    myReview: {
      immediate: true,
      handler() {
        this.resetFields();
      }
    }
  },

  methods: {
    resetFields() {
      this.review = this.myReview?.review || '';
      this.rating = this.myReview?.rating || 0;
      this.ratingError = '';
    },

    async submitReview() {
      this.$store.dispatch('bookStore/submitReview', {
        book: this.book,
        review: this.review,
        rating: this.rating,
      })
    },

    closeForm() {
      this.resetFields();
      this.$emit('update:modelValue', false);
    },
  },
};
</script>