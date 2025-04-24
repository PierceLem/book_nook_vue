<template>
  <v-container 
    class="d-flex flex-column pa-0 ma-0" 
    min-width="100%"
  >
    <div class="d-flex flex-row pa-2">
      <div class="d-flex flex-column flex-grow-1">
        <v-card class="pa-4 card-background" rounded="lg" elevation="0" color="indigo-lighten-1">
          <div class="image-container">
            <v-img
              :src="require('@/assets/undraw_code-thinking.svg')"
            />
          </div>

          <v-avatar
            size="88px"
            border="md"
            color="indigo-lighten-1"
            image="https://randomuser.me/api/portraits/women/85.jpg"
            class="profile-avatar"
          ></v-avatar>

          <div class="filler-img"></div>
          <span class="profile-username">Pierce_admin</span>
          <span class="text-body-2 text-medium-emphasis profile-email">Parcwill@gmail.com</span>
        </v-card>
      </div>
      <div class="ml-5" style="width: 400px;">
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ListUsers from '@/components/ListUsers.vue';

export default {
  name: "MyProfile2",

  components: {
    ListUsers,
  },

  data() {
    return {
      bio: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
      newBio: "",
      isEditing: false,
      searchQuery: "",
      rules: {
        bio: [value => !!value || "Bio cannot be empty"]
      },
      length: 3,
      window: 0,
    }
  },

  methods: {
    submitBio() {
      this.bio = this.newBio;
      this.isEditing = false;
    },
  },

  computed: {
    bioIcon() {
      return this.isEditing ? "mdi-undo-variant" : "mdi-pencil";
    },

    ...mapGetters("auth", ["allUsers"]),

    filteredUsers() {
      if (!this.searchQuery) return this.allUsers;

      const query = this.searchQuery.toLowerCase();

      return this.allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
.card-background {
  position: relative;
  width: 550px;
  overflow: visible;
}

.image-container {
  transform: scaleX(-1);
  width: 600px;
}

.filler-img {
  position: absolute;
  background-color: white;
  top: 45px;
  left: 70px;
  height: 140px;
  width: 140px;
}

.profile-avatar {
  position: absolute;
  top: 130px;
  left: 312px;
}

.profile-username {
  position: absolute;
  font-size: 25px;
  font-weight: 500;
  top: 50px;
  left: 70px;
}

.profile-email {
  position: absolute;
  top: 90px;
  left: 70px;
}
</style>