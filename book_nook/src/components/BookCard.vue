<template>
  <v-sheet 
    max-width="600" 
    min-width="100%"
    height="250" 
    elevation="4"
    class="d-flex flex-row ma-0 py-0 pl-2" 
    border="sm" 
    rounded="lg" 
    style="overflow: hidden;"
  >
    <div class="d-flex flex-row flex-grow-1 py-4">
      <v-col 
        cols="4" 
        class="pa-0 d-flex justify-center align-center"
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
        <u><h4>{{ title }}</h4></u>
        <h5 class="text-medium-emphasis">{{ author }}</h5>

        <v-divider class="mt-2"></v-divider>

        <p class="book-desc fade-out">
          {{ description }}
        </p>
      </v-col>
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
        <v-icon>mdi-download</v-icon>
      </v-btn>

      <v-btn 
        variant="text"
        min-height="35px"
        min-width="35px"
        max-height="35px"
        max-width="35px"
        rounded="0"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "BookCard",

  data() {
    return {
      liked: false,
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
  padding-top: 6px;
  padding-bottom: 12px;
  overflow-y: auto;
  scrollbar-width: none;
  font-weight: 400;
  font-size: smaller;
  color: black;
  line-height: 15px;
}

.book-desc::-webkit-scrollbar {
  display: none;
}

.fade-out {
  position: relative;
  max-height: 200px;
  
  -webkit-mask-image: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 1) 10%, 
    rgba(0, 0, 0, 1) 80%, 
    rgba(0, 0, 0, 0) 100%
  );
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
</style>
