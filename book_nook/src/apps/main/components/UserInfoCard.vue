<template>
  <v-menu 
    :close-on-content-click="false" 
    activator="parent"
    location="bottom"
  >
    <v-card class="d-flex flex-column align-center pa-2">
      <v-avatar 
        :image="owner.avatar" 
        size="75px" 
        class="mb-1"
      ></v-avatar>

      <span class="text-subtitle-2 text-indigo">{{ owner.username }}</span>

      <v-card
        color="indigo"
        variant="tonal"
        rounded="lg"
        class="my-2"
      >
        <v-card-text
          class="py-1 px-2"
        >
          <span class="text-caption">{{ owner.bio || "No bio" }}</span>
        </v-card-text>
      </v-card>

      <div class="d-flex flex-row justify-space-evenly w-100 pt-1">
        <v-card class="d-flex flex-column align-center px-1 mr-1" variant="outlined" color="indigo">
          <span class="text-h6" style="line-height: 20px;">{{ owner.friends_count || 0 }}</span>
          <span class="text-caption" style="line-height: 12px;">friends</span>
        </v-card>

        <v-card class="d-flex flex-column align-center px-1" variant="outlined" color="indigo">
          <span class="text-h6" style="line-height: 20px;">{{ owner.reviews_count || 0 }}</span>
          <span class="text-caption" style="line-height: 12px;">reviews</span>
        </v-card>
      </div>

      <v-btn
        v-if="!isFriend"
        variant="tonal"
        color="indigo"
        size="x-small"
        height="18px"
        density="comfortable"
        class="mt-2"
        @click="sendFriendRequest"
      >
        Friend Request
      </v-btn>
      
      <v-chip 
        v-else
        color="green"
        append-icon="mdi-account-check-outline"
        class="mt-2"
      >
        Friends
      </v-chip>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "UserInfoCard",

  props: {
    owner: {
      type: Object,
    },
  },

  computed: {
    ...mapState('auth', ['user']),

    ...mapState('social', ['friends']),

    isFriend() {
      return this.friends.some(friend => friend.other_user.id === this.owner.id);
    }
  },

  methods: {
    async sendFriendRequest() {
      this.$store.dispatch("social/sendFriendRequest", { "to_user_id": this.owner.id, "from_user_id": this.user.id})
    }
  }
};
</script>

<style scoped>
.text-user {
  color: #3F51B5;
  font-weight: 500;
}
</style>