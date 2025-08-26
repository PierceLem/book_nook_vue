<template>
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
        <v-card class="d-flex flex-column align-center px-1 py-1 my-1" variant="outlined" color="indigo">
          <span class="text-h6" style="line-height: 20px;">44</span>
          <span class="text-caption" style="line-height: 12px;">friends</span>
        </v-card>

        <v-card class="d-flex flex-column align-center px-1 py-1 my-1" variant="outlined" color="indigo">
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
        @click="sendFriendRequest"
      >
        Friend Request
      </v-btn>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

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

  inject: ['showSnackbar'],

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

        this.showSnackbar({
          subject: 'Friend request sent to ' + response.data.to_user.username,
          content: 'You can view friend request data in the profile page',
          icon: 'mdi-check',
          color: 'green',
        })
      } catch (error) {
        console.log(error);
        this.showSnackbar({
          subject: error.response.data.non_field_errors[0],
          content: 'You can view friend request data in the profile page',
          icon: 'mdi-alpha-x',
          color: 'red',
        })
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