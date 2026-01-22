<template>
  <div class="d-flex flex-row h-100 w-100">
    <div 
      class="d-flex flex-column flex-grow-1 ml-4 mb-4 mt-15 bg-indigo-lighten-5 rounded-xl position-relative" 
      style="overflow: visible;"
    >
      <ProfileCard />

      <div class="d-flex flex-row w-100 h-100 pa-4" style="margin-top: 130px;">
        
        <AboutProfile />

        <v-divider vertical opacity="35%" thickness="2" color="indigo" class="custom-shadow-divider"></v-divider>

        <ProfileSettings />
        
      </div>
    </div>
    
    <FriendsManager />
  </div>
</template>

<script>
import ProfileCard from '@/apps/personal/components/ProfileCard.vue';
import AboutProfile from '@/apps/personal/AboutProfile.vue';
import ProfileSettings from '@/apps/personal/ProfileSettings.vue';
import FriendsManager from '@/apps/personal/FriendsManager.vue';

export default {
  name: "MyProfile",

  components: {
    ProfileCard,
    AboutProfile,
    ProfileSettings,
    FriendsManager,
  },
  
  data() {
    return {
      bio: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
      newBio: "",
      instagramHandle: '',
      isEditing: false,
      searchQuery: "",
      rules: {
        bio: [
          value => !!value || "Bio cannot be empty",
          value => value.length <= 400 || `Maximum 200 characters allowed).`
        ]
      },
    }
  },

  methods: {
    submitBio() {
      this.bio = this.newBio;
      this.isEditing = false;
    },
  }
};
</script>

<style scoped>

</style>