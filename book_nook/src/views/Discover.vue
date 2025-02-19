<template>
  <v-container class="d-flex flex-column ma-0 pa-0" min-height="100%" min-width="100%">
    <v-container class="bg-img" width="100%" max-width="100%" max-height="250">
      <div class="d-flex flex-row justify-between w-100 px-8">
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </v-container>

    <v-container class="bg-img" width="100%" height="250" max-width="100%" max-height="250">
    </v-container>

    <v-container class="bg-img" width="100%" height="250" max-width="100%" max-height="250">
    </v-container>
  </v-container>
</template>

<script>
import BookCard from '@/components/BookCard.vue';

export default {
  name: "Discover",
  components: {
    BookCard,
  },
};
</script>

<style scoped>
.bg-img {
  background-image: url('@/assets/bg_shelf.jpg');
  background-size: 100% 100%;
  background-position: center;
}
</style>