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

      <div class="d-flex flex-row justify-space-evenly w-100 pt-1">
        <v-card class="d-flex flex-column align-center px-1 mr-1" variant="outlined" color="indigo">
          <span class="text-h6" style="line-height: 20px;">44</span>
          <span class="text-caption" style="line-height: 12px;">friends</span>
        </v-card>

        <v-card class="d-flex flex-column align-center px-1" variant="outlined" color="indigo">
          <span class="text-h6" style="line-height: 20px;">25</span>
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
    isFriend: {
      type: Boolean,
    }
  },

  computed: {
    ...mapState('auth', ['user']),
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