<template>
  <v-list-item 
    density="compact"
    class="py-1 px-2"
    :variant="review.is_owner ? 'tonal' : 'text'"
    base-color="indigo"
  >
    <template v-slot:prepend>
      <v-avatar size="40" class="my-2">
        <v-img :src=review.user.avatar />
      </v-avatar>
    </template>

    <v-list-item-title class="d-flex flex-row align-start">
      <v-rating
        :model-value="review.rating"
        half-increments
        size="x-small"
        density="comfortable"
        color="indigo"
        active-color="yellow-darken-3"
        readonly
      ></v-rating>

      <v-spacer></v-spacer>

      <span class="date">{{ formatDate(review.created_at, now) }}</span>
    </v-list-item-title>

    <div class="d-flex justify-start align-top">
      <div class="review-text pl-1 py-1">
        <v-btn 
          variant="text" 
          color="indigo" 
          :readonly="review.is_owner"
          :disabled="review.is_owner"
          density="compact"
          size="small"
          slim
          class="text-none"
        >
          <UserInfoCard
            :owner="review.user"
          />

          <span class="text-user">{{ review.is_owner ? 'you' : review.user.username }}</span>
        </v-btn>

        <span class="text-review"> - {{ review.review }}</span>
      </div>
    </div>

    <v-overlay
      v-if="review.is_owner"
      activator="parent"
      open-on-hover
      open-delay="500"
      contained
      class="d-flex flex-row align-center justify-center"
      scrim="false"
    >
      <v-btn 
        tile 
        rounded="lg" 
        size="35px" 
        variant="flat" 
        icon="mdi-delete" 
        color="red" 
        class="mr-2" 
        @click="$emit('delete-review', review.id)"
      />
      <v-btn 
        tile 
        rounded="lg" 
        size="35px" 
        variant="flat" 
        icon="mdi-tooltip-edit-outline" 
        color="green" 
        @click="$emit('edit-review')"
      />
    </v-overlay>
  </v-list-item>

  <v-divider v-if="!review.is_owner" class="ml-16" color="indigo" />
</template>

<script>
import { mapState } from 'vuex';
import UserInfoCard from '@/apps/main/components/UserInfoCard.vue';
import { formatDate } from '@/utils/dateUtils';

export default {
  name: "Review",

  components: {
    UserInfoCard,
  },

  data() {
    return {
    }
  },

  emits: ['edit-review', 'delete-review'], 

  props: {
    review: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatDate
  },

  computed: {
    ...mapState('ui', ['now']),
  }
}
</script>

<style scoped>
.review-text {
  display: inline;
  font-size: 0.825rem;
  line-height: 15px;
}

.text-review {
  opacity: 75%;
  font-weight: 400;
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

.v-overlay {
  height: 100% !important;
  top: 0 !important;
}
</style>