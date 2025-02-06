<template>
  <v-menu 
    open-on-hover 
    open-delay="10" 
    close-delay="10"
  >
    <template v-slot:activator="{ props }">
      <v-avatar 
        variant="elevated" 
        color="blue-grey-darken-3" 
        size="46"
        v-bind="props"
      >
        <v-icon 
          size="large" 
          color="white"
        >
          mdi-account-group
        </v-icon>
      </v-avatar>
    </template>

    <v-list 
      density="compact" 
      class="pa-0"
    >
      <template v-for="n in 3" :key="n">
        <v-list-item
          class="participant-list mx-2 pa-0"
        >
          <template v-slot:prepend>
            <v-avatar
              image="https://randomuser.me/api/portraits/women/85.jpg"
              size="22px"
            >
            </v-avatar>
          </template>

          <template v-slot:title>
            <span class="text-body-2">
              Insert username here
            </span>
          </template>
        </v-list-item>

        <v-divider class="ml-9" v-if="n < 3"></v-divider>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ThreadParticipants"
};
</script>

<style scoped>
.participant-list::v-deep(.v-list-item__prepend) {
  width: 30px;
}
</style>