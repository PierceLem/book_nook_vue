<template>
  <v-card 
    class="profile-card d-flex flex-row align-center rounded-xl bg-indigo-lighten-5 pl-0" 
    elevation="3"
  >
    <v-card 
      height="150px" 
      min-width="120px" 
      max-width="120px" 
      elevation="10" 
      rounded="lg" 
      class="d-flex flex-column justify-center bg-white ml-3 indigo-border"
    >
      <div class="d-flex justify-center align-center flex-grow-1">
        <v-avatar 
          :image="user.avatar"
          :key="user.avatar"
          size="100px" 
          class="elevation-6 border-0"
        ></v-avatar>
      </div>

      <v-btn
        variant="tonal"
        density="comfortable"
        color="indigo"
        rounded="0"
        width="100%"
        class="pa-0"
      >
        <v-icon size="25px">mdi-swap-horizontal-bold</v-icon>

        <v-menu
          v-model="menu"
          activator="parent"
          location="bottom"
          :close-on-content-click="false"
        >
          <v-list
            density="compact"
            :lines="false"
            color="indigo"
            slim
            base-color="indigo"
            class="pa-0"
          >
            <v-list-item
              v-if="user.avatar != 'http://127.0.0.1:8000/media/avatars/default-avatar.jpg'"
              value="delete"
              subtitle="Delete"
              prepend-icon="mdi-delete"
              @click="deleteAvatar"
            />
            <v-file-input 
              v-model="selectedAvatar"
              hide-details
              density="compact"
              color="indigo"
              variant="outlined"
              accept="image/*"
              class="pr-3 pl-4 pb-2"
            ></v-file-input>
          </v-list>
        </v-menu>
      </v-btn>
    </v-card>

    <div class="d-flex flex-column justify-space-between flex-grow-1 h-100 py-5">
      <div class="d-flex flex-column align-self-start bg-white pl-2 pr-7 py-1 fade-right">
        <div class="text-h5 text-indigo align-self-start">{{ user.username }}</div>
        <div class="d-flex flex-row align-center justify-start">
          <v-icon size="x-small" color="indigo">mdi-email</v-icon>
          <span class="text-caption text-indigo pl-1"> {{ user.email }}</span>
        </div>
      </div>

      <div class="d-flex flex-row align-center justify-space-around w-lg-75 w-xl-50 w-md-75 w-100">
        <div 
          class="d-flex flex-column justify-center bg-white px-1 pt-1 rounded-lg elevation-10 bg-indigo" 
          style="width: 52px;"
        >
          <span class="text-caption text-white align-self-center" style="line-height: 26px;">
            Reviews
          </span>
          <span class="text-h6 text-white align-self-center">
            {{ user.reviews_count || 0 }}
          </span>
        </div>

        <div 
          class="d-flex flex-column justify-center bg-white px-1 pt-1 rounded-lg elevation-10 bg-indigo" 
          style="width: 52px;"
        >
          <span class="text-caption text-white align-self-center" style="line-height: 26px;">
            Friends
          </span>
          <span class="text-h6 text-white align-self-center">
            {{ user.friends_count || 0 }}
          </span>
        </div>

        <div 
          class="d-flex flex-column justify-center bg-white px-1 pt-1 rounded-lg elevation-10 bg-indigo"   
          style="width: 52px;"
        >
          <span class="text-caption text-white align-self-center" style="line-height: 13px;">
            Saved
          </span>
          <span class="text-caption text-white align-self-center" style="line-height: 13px;">
            Books
          </span>
          <span class="text-h6 text-white align-self-center">
            {{ user.saved_books_count || 0 }}
          </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ProfileCard",
  
  data() {
    return {
      menu: false,
      selectedAvatar: null,
    }
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  watch: {
    selectedAvatar(newAvatar) {
      console.log("Selected avatar changed:", newAvatar);
      if (newAvatar) {
        this.updateProfilePic(newAvatar);
      }
    }
  },

  methods: {
    async updateProfilePic(file) {
      console.log("update profile pic called");
      file = Array.isArray(file) ? file[0] : file;

      console.log("Selected file:", file);

      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        await this.$store.dispatch(
          "auth/updateProfile",
          formData
        );

        this.selectedAvatar = null;
        this.menu = false;
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  }
};
</script>

<style scoped>
.profile-card {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  height: 180px;
  width: 90%;
  border: solid 2px #E8EAF6;

  background-image: 
    linear-gradient(to top, rgba(26, 35, 126, 0.55), transparent 70%),
    linear-gradient(to bottom, rgba(26, 35, 126, 0.55), transparent 70%),
    linear-gradient(to left, rgba(26, 35, 126, 0.3), transparent 40%),
    url('@/assets/bookshelf_2.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.fade-right {
  background: linear-gradient(to right, rgba(63, 81, 181, 0.6), transparent 3px);
  -webkit-mask-image: linear-gradient(to right, black 0%, black calc(100% - 22px), transparent 100%);
  mask-image: linear-gradient(to right, black 0%, black calc(100% - 22px), transparent 100%);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.indigo-border {
  border: solid 3px #3F51B5;
}
</style>