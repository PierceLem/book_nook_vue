<template>
  <v-app-bar elevation="0" floating>
    <div class="w-100 h-100 pt-2 pb-0 px-2">
      <div class="nav-wrapper">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon tile rounded="lg" size="56px" color="indigo" @click.prevent="toggleDrawer" class="mr-4" />
        </div>

        <div class="d-flex align-center">
          <NotificationsMenu />

          <v-divider color="indigo" vertical class="mx-2 my-2" />

          <span class="text-indigo text-body-2 mx-2">{{ user.username }}</span>

          <v-avatar :image="user.avatar" size="48px" class="mr-1"></v-avatar>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NotificationsMenu from "./NotificationsMenu.vue";

export default {
  name: "AppBar",

  components: {
    NotificationsMenu,
  },

  data() {
    return {
      drawer: true,
      fav: false,
      message: false,
      hints: false,
    };
  },

  computed: {
    ...mapState("ui", {
      navDrawerState: (state) => state.navDrawer,
    }),

    ...mapState('auth', ['user']),
  },

  methods: {
    ...mapActions("ui", ["setDrawer"]),
    toggleDrawer() {
      this.setDrawer(!this.navDrawerState);
    },
  },

  watch: {
    "$vuetify.breakpoint.smAndDown"(isSmallScreen) {
      if (isSmallScreen) {
        this.setDrawer(false);
      }
    },
  },
};
</script>

<style scoped>
.nav-wrapper {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: #E8EAF6;
  overflow: hidden;
}

.v-app-bar.v-toolbar {
  background-color: rgb(255 255 255 / 0%);
}
</style>