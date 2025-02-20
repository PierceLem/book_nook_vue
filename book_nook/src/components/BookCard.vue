<template>
  <v-sheet max-width="600" min-width="100%" height="200" class="d-flex flex-row ma-2 pb-4" color="transparent">
    <v-col cols="4" class="pa-0 d-flex justify-center align-center">
      <img 
        :src="image" 
        class="book-cover"
        alt="Book Cover"
      />
    </v-col>

    <v-col cols="8" class="d-flex flex-column pa-0 pl-2">
      <u><h4>{{ title }}</h4></u>
      <h5 class="text-medium-emphasis">{{ author }}</h5>

      <v-divider class="mt-2"></v-divider>

      <p class="book-desc fade-out">
        {{ description }}
      </p>
    </v-col>
  </v-sheet>
</template>

<script>
export default {
  name: "BookCard",
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
  }
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
  
  transition: box-shadow 0.3s ease-in-out;
}

.book-cover:hover {
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.6), 
              0px 6px 8px rgba(0, 0, 0, 0.55);
              
  cursor: pointer;
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
</style>
