<template>
  <v-row no-gutters>
    <v-col
      v-for="n in 10"
      :key="n"
      cols="12"
      lg="4"
      md="6"
      xs="12"
    >

      <BookCard />

    </v-col>
  </v-row>
</template>

<script>
import BookCard from "@/components/BookCard.vue";

export default {
  name: "Discover",
  components: {
    BookCard,
  },  
};
</script>
