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
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

html,
body {
  scrollbar-width: none;
}
</style>