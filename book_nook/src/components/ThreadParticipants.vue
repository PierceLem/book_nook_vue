<template>
  <v-menu 
    open-on-hover
    open-delay="800" 
    close-delay="200"
  >
    <template v-slot:activator="{ props }">
      <v-avatar 
        size="36"
        v-bind="props"
        :image="avatar"
      >
      </v-avatar>
    </template>

    <v-card class="pa-0">
      <div class="w-100 py-1 text-center bg-indigo">
        <span class="text-h6">Participants</span>
      </div>

      <v-list
        class="pa-0 indigo-scrollbar"
        max-height="300px"
      >
        <template v-for="participant in participants">
          <ListUsers
            :name="participant.username"
            :email="participant.email"
            :avatar="participant.avatar"
            icon
            :disabled="false"
          />
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import ListUsers from './ListUsers.vue';

export default {
  name: "ThreadParticipants",

  components: {
    ListUsers,
  },

  props: {
    participants: Array,
    avatar: String,
  },
};
</script>

<style scoped>
.indigo-scrollbar {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}
</style>