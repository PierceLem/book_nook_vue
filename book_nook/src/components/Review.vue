<template>
  <v-list-item 
    color="grey-lighten-4"
    density="compact"
    border="sm"
    rounded="lg"
    elevation="2"
    class="mx-2 my-2 pa-0 pl-12 review-item"
    style="overflow: hidden; position: relative;"
  >
    <v-avatar size="40" border="md" class="review-avatar">
      <v-img src="https://randomuser.me/api/portraits/women/85.jpg" />
    </v-avatar>

    <v-toolbar height="25" color="grey-lighten-3" class="px-3 toolbar-border">
      <v-toolbar-title class="ml-0">{{ user }}</v-toolbar-title>

      <template v-slot:append>
        <span class="text-caption">{{ createdAt }}</span>
      </template>
    </v-toolbar>

    <span class="text-review px-2 pt-1">{{ text }}</span>

    <div class="d-flex flex-row align-bottom justify-end w-100 pr-2">
      <span class="likes-number">{{ localReviewLikes }}</span>
      <v-icon 
        size="xs"
        :color="localReviewLiked ? 'blue' : ''"
        class="like"
        @click="likeReview"
      >
        {{ localReviewLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}
      </v-icon>
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
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    reviewLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    reviewLiked: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviewId: {
      type: Number,
      required: true,
    }
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

.like {
  padding-bottom: 2px;
}

.like:hover {
  cursor: pointer;
}

.likes-number {
  font-size: x-small;
  opacity: 60%;
  margin-right: 6px;
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