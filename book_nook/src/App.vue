<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>


export default {
  name: "App",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || 'DefaultLayout';
      return require(`@/layouts/${layout}.vue`).default;
    }
  },

  created() {
    this.$store.commit("auth/initializeStore");
  },
};
</script>

<style>
html, body {
  overflow-y: scroll;
  scrollbar-width: none;
  scrollbar-color: rgba(26, 35, 126, 0.5) transparent;
}
</style>