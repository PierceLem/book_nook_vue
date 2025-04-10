<template>
  <v-list-item 
    color="grey-lighten-4"
    density="compact"
    border="sm"
    rounded="lg"
    elevation="1"
    class="mx-2 my-2 pa-0 pl-12 review-item"
    style="overflow: hidden; position: relative;"
  >
    <v-avatar 
      size="40" 
      border="md" 
      class="review-avatar"
    >
      <v-img src="https://randomuser.me/api/portraits/women/85.jpg" />
    </v-avatar>

    <v-toolbar 
      height="25" 
      :color="isOwner ? 'blue-lighten-5' : 'grey-lighten-4'" 
      class="px-3 toolbar-border"
    >
      <v-toolbar-title 
        class="ml-0" 
        :class="isOwner ? 'text-blue-darken-3' : ''"
        :text="isOwner ? 'You' : user"
      >
      </v-toolbar-title>

      <template v-slot:append>
        <v-icon
          v-if="isOwner"
          size="14"
          class="review-option mr-2"
        >
          mdi-pencil-outline
        </v-icon>

        <v-icon
          v-if="isOwner"
          size="14"
          class="review-option mr-3"
        >
          mdi-trash-can-outline
        </v-icon>

        <v-rating
          :model-value="rating"
          half-increments
          size="x-small"
          density="compact"
          color="yellow-darken-3"
          class="pb-1"
          readonly
        ></v-rating>
      </template>
    </v-toolbar>

    <span class="text-review px-2 pt-1">{{ text }}</span>

    <div class="d-flex flex-row align-center justify-end w-100 pr-1">
      <span class="date">{{ createdAt }}</span>
    </div>
  </v-list-item>
</template>

<script>
import axios from 'axios';

export default {
  name: "Review",

  data() {
    return {
      localReviewLiked: this.reviewLiked,
      localReviewLikes: this.reviewLikes,
    }
  },

  props: {
    reviewId: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    async likeReview() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        const response = await axios.post(
          `/like-review/${this.reviewId}/`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        this.localReviewLikes = response.data.likes;
        this.localReviewLiked = response.data.liked;
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
  }
}
</script>

<style scoped>
.text-review {
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 15px;
  opacity: 75%;
}

.toolbar-border {
  border-bottom-left-radius: 8px;
}

.review-item {
  overflow: hidden;
  border-top-left-radius: 22px !important;
}

.review-avatar {
  position: absolute;
  top: 4px;
  left: 4px;
}

.review-option:hover {
  cursor: pointer;
}

.date {
  font-size: x-small;
  opacity: 60%;
  margin-right: 3px;
  margin-left: 6px;
  padding-top: 2px;
}

:deep(.v-toolbar-title) {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 25px;
  text-transform: none;
}
</style>