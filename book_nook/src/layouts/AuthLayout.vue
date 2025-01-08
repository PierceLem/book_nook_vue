<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/bg-book.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>