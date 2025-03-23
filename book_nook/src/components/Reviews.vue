<template>
  <div class="review-container">
    <v-toolbar height="35">
      <v-toolbar-title class="text-body-2">
        Reviews
        
        <v-badge
          color="grey"
          content="10"
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
      <Review />
    </div>

    <div class="w-100 px-2">
      <v-textarea 
        v-model="review"
        rows="1" 
        auto-grow 
        clearable 
        hide-details
        density="compact"
        max-rows="3"
        label="Write a review"
      >
        <template v-slot:prepend-inner>
          <v-btn 
            height="30"
            width="30"
            icon="mdi-send" 
            variant="text" 
            size="small"
          >
          </v-btn>
        </template>
      </v-textarea>
    </div>
  </div>
</template>

<script>
import Review from './Review.vue';

export default {
  name: "Reviews",

  components: {
    Review,
  },

  data() {
    return {
      review: "",
    }
  },
  
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
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
  overflow-y: auto;
  scrollbar-width: thin;
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