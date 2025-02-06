<template>
  <v-container 
    class="d-flex flex-column pa-0 ma-0" 
    min-height="100%" 
    min-width="100%"
  >
    <v-card 
      height="60%" 
      rounded="xl" 
      elevation="10"
      class="mx-2 mt-2 card-border gradient-overlay" 
      image="https://wallpaperaccess.com/full/253342.jpg"
    >
    </v-card>

    <v-card 
      height="80%" 
      elevation="10"
      rounded="xl" 
      class="mx-8 profile-card card-border"
    >
      <v-avatar image="https://randomuser.me/api/portraits/women/85.jpg" size="100px" class="profile-avatar"></v-avatar>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MyProfile",
};
</script>

<style scoped>
.gradient-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgb(96, 125, 139, 0.5), rgb(55, 71, 79, 0.6));
  z-index: 1;
  border-radius: inherit;
}

.profile-card {
  position: relative;
  top: -40px;
  overflow: visible;
}

.card-border {
  border-width: 3px;
  border-color: #607D8B;
}

.profile-avatar {
  position: absolute;
  border-width: 4px;
  border-color: white;
  top: -50px;
  left: 50px;
}
</style>