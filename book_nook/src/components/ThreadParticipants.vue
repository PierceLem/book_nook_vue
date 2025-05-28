<template>
  <v-menu 
    open-on-hover
    open-delay="800" 
    close-delay="200"
  >
    <template v-slot:activator="{ props }">
      <v-avatar 
        color="indigo" 
        size="36"
        v-bind="props"
      >
        <v-icon  
          color="white"
        >
          mdi-account-group
        </v-icon>
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
        <template v-for="user in users" :key="user.id">
          <ListUsers
            :name="user.name"
            :email="user.email"
            :avatar="user.avatar"
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

  data() {
    return {
      users: [
        { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", avatar: "https://randomuser.me/api/portraits/women/85.jpg" },
        { id: 2, name: "Bob Smith", email: "bob.smith@example.com", avatar: "https://randomuser.me/api/portraits/men/85.jpg" },
        { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", avatar: "https://randomuser.me/api/portraits/men/84.jpg" },
        { id: 4, name: "Diana Ross", email: "diana.ross@example.com", avatar: "https://randomuser.me/api/portraits/women/84.jpg" },
        { id: 5, name: "Ethan Carter", email: "ethan.carter@example.com", avatar: "https://randomuser.me/api/portraits/men/83.jpg" },
        { id: 6, name: "Fiona Adams", email: "fiona.adams@example.com", avatar: "https://randomuser.me/api/portraits/women/83.jpg" },
        { id: 7, name: "George Harris", email: "george.harris@example.com", avatar: "https://randomuser.me/api/portraits/men/82.jpg" },
        { id: 8, name: "Hannah White", email: "hannah.white@example.com", avatar: "https://randomuser.me/api/portraits/women/82.jpg" },
        { id: 9, name: "Ian Brooks", email: "ian.brooks@example.com", avatar: "https://randomuser.me/api/portraits/men/81.jpg" },
        { id: 10, name: "Jessica Davis", email: "jessica.davis@example.com", avatar: "https://randomuser.me/api/portraits/women/81.jpg" },
        { id: 11, name: "Kevin Miller", email: "kevin.miller@example.com", avatar: "https://randomuser.me/api/portraits/men/80.jpg" },
        { id: 12, name: "Laura Wilson", email: "laura.wilson@example.com", avatar: "https://randomuser.me/api/portraits/women/80.jpg" },
        { id: 13, name: "Michael Scott", email: "michael.scott@example.com", avatar: "https://randomuser.me/api/portraits/men/79.jpg" },
        { id: 14, name: "Nancy Allen", email: "nancy.allen@example.com", avatar: "https://randomuser.me/api/portraits/women/79.jpg" },
        { id: 15, name: "Oliver Wright", email: "oliver.wright@example.com", avatar: "https://randomuser.me/api/portraits/men/78.jpg" },
        { id: 16, name: "Paula Thomas", email: "paula.thomas@example.com", avatar: "https://randomuser.me/api/portraits/women/78.jpg" },
        { id: 17, name: "Quentin Baker", email: "quentin.baker@example.com", avatar: "https://randomuser.me/api/portraits/men/77.jpg" },
        { id: 18, name: "Rachel Green", email: "rachel.green@example.com", avatar: "https://randomuser.me/api/portraits/women/77.jpg" },
        { id: 19, name: "Samuel Parker", email: "samuel.parker@example.com", avatar: "https://randomuser.me/api/portraits/men/76.jpg" },
        { id: 20, name: "Tina Roberts", email: "tina.roberts@example.com", avatar: "https://randomuser.me/api/portraits/women/76.jpg" },
        { id: 21, name: "Ulysses Turner", email: "ulysses.turner@example.com", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
        { id: 22, name: "Victoria Evans", email: "victoria.evans@example.com", avatar: "https://randomuser.me/api/portraits/women/75.jpg" },
        { id: 23, name: "William Sanchez", email: "william.sanchez@example.com", avatar: "https://randomuser.me/api/portraits/men/74.jpg" },
        { id: 24, name: "Xena Brooks", email: "xena.brooks@example.com", avatar: "https://randomuser.me/api/portraits/women/74.jpg" },
        { id: 25, name: "Yusuf Coleman", email: "yusuf.coleman@example.com", avatar: "https://randomuser.me/api/portraits/men/73.jpg" },
        { id: 26, name: "Zara Morgan", email: "zara.morgan@example.com", avatar: "https://randomuser.me/api/portraits/women/73.jpg" },
      ],
    }
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