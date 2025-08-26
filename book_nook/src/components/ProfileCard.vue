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

        <v-menu activator="parent">
          <v-list density="compact" :lines="false" color="indigo" slim base-color="indigo" class="pa-0">
            <v-list-item
              v-if="user.avatar != 'http://127.0.0.1:8000/media/avatars/default-avatar.jpg'"
              value="delete"
              key="delete"
              subtitle="Delete"
              prepend-icon="mdi-delete"
              @click="deleteAvatar"
            >
            </v-list-item>
            <v-list-item
              key="delete"
              value="upload"
              subtitle="Upload"
              prepend-icon="mdi-upload"
              @click="$refs.avatarInput.click()"
            >
            </v-list-item>
            <v-file-input 
              v-model="avatar"
              ref="avatarInput" 
              style="display: none;"
              accept="image/*"
              @change="validateFile"
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
            24
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
            432
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
            25
          </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: "ProfileCard",
  
  data() {
    return {
      selectedAvatar: null,
    }
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  methods: {
    validateFile(event) {
      const selectedFile = event.target?.files?.[0];
      this.validateAvatar(selectedFile);
    },

    async validateAvatar(file) {
      console.log(file.type);
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024;

      if (!file) {
        console.log('No file selected.');
        this.selectedAvatar = null;
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        console.log('Only JPG and PNG files are allowed.');
        this.selectedAvatar = null;
        return;
      }

      if (file.size > maxSize) {
        console.log('File size must be under 2MB.');
        this.selectedAvatar = null;
        return;
      }

      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post('/upload-avatar/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        });

        console.log('Upload successful:', response.data);
        this.selectedAvatar = null;
        this.$store.commit('auth/updateAvatar', response.data.avatar_url);
      } catch (error) {
        console.error('Upload failed:', error.response?.data || error.message);
        this.selectedAvatar = null;
      }
    },

    async deleteAvatar() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete('/upload-avatar/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data);
        this.$store.commit('auth/updateAvatar', response.data.avatar_url);
      } catch (error) {
        console.error('Delete failed:', error.response?.data || error.message);
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