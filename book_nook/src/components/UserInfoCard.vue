<template>
  <v-btn 
    variant="text" 
    color="indigo" 
    :disabled="isOwner"
    density="compact"
    size="small"
    slim
    style="text-transform: none;"
  >
    <v-menu 
      :close-on-content-click="false" 
      activator="parent"
      location="top"
    >
      <v-card class="d-flex flex-column align-center pa-2">
        <v-avatar 
          :image="owner.avatar" 
          size="75px" 
          class="mb-1"
        ></v-avatar>

        <span class="text-subtitle-2 text-indigo">{{ owner.username }}</span>

        <div class="d-flex flex-row justify-space-around w-100 pt-1 pb-2">
          <v-card class="d-flex flex-column align-center px-1 py-1" variant="outlined" color="indigo">
            <span class="text-h6" style="line-height: 20px;">44</span>
            <span class="text-caption" style="line-height: 12px;">friends</span>
          </v-card>

          <v-card class="d-flex flex-column align-center px-1 py-1" variant="outlined" color="indigo">
            <span class="text-h6" style="line-height: 20px;">25</span>
            <span class="text-caption" style="line-height: 12px;">reviews</span>
          </v-card>
        </div>

        <v-btn
          variant="tonal"
          color="indigo"
          size="x-small"
          height="18px"
          density="comfortable"
          @click="sendFriendRequest"
        >
          Friend Request
        </v-btn>
      </v-card>
    </v-menu>
    <span class="text-user">{{ isOwner ? 'you' : owner.username }}</span>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: "UserInfoCard",

  props: {
    isOwner: {
      type: Boolean,
    },
    owner: {
      type: Object,
    },
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  methods: {
    async sendFriendRequest() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/friend-request/",
          {
            from_user_id: this.user.id,
            to_user_id: this.owner.id,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error sending friend request:", error);
        this.reviews = [];
      }
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