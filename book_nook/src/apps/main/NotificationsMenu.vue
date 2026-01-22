<template>
  <v-menu 
    v-model="menu" 
    :close-on-content-click="false"
    location="end"
  >
    <template v-slot:activator="{ props }">
      <v-btn 
        stacked
        tile 
        rounded="lg" 
        size="56px" 
        color="indigo" 
        v-bind="props"
        class="text-none"
      >
        <v-badge
          :model-value="notifications.length > 0"
          :content="notifications.length"
          color="error"
        >
          <v-icon color="indigo">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-card width="400" class="d-flex flex-column pa-0 ma-0">
      <div class="w-100 text-center bg-indigo pa-2">
        <span class="text-h6">Notifications</span>
      </div>

      <v-list class="py-0">
        <template v-for="notification in notifications">
          <v-list-item
            slim
            :title="notification.title"
            class="py-2"
          >
            <template v-slot:prepend>
              <v-icon color="indigo">{{ notification.icon }}</v-icon>
            </template>

            <template v-slot:subtitle>
              {{ notification.content }}
            </template>

            <template v-slot:append>
              <div class="d-flex flex-column align-center pl-2">
                <span class="text-caption text-medium-emphasis">{{ notification.date }}</span>

                <v-btn
                  icon="mdi-delete-variant"
                  color="red"
                  size="x-small"
                  height="25px"
                  width="25px"
                  variant="text"
                ></v-btn>
              </div>
            </template>
          </v-list-item>

          <v-divider class="ml-15" color="indigo"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "NotificationsMenu",

  data() {
    return {
      menu: false,
      notifications: [
        {
          icon: "mdi-message-alert",
          title: "New Message from Jane",
          content: "Hey! Are we still on for tomorrow?",
          date: "10s"
        },
        {
          icon: "mdi-account-multiple-plus-outline",
          title: "Friend Request",
          content: "Alex Johnson sent you a friend request.",
          date: "1hr"
        },
        {
          icon: "mdi-message-alert",
          title: "New Message from Chris",
          content: "Hey! Did you get to reading that book I sent you? I wanted to talk to you about it when you got the chance.",
          date: "1d"
        },
        {
          icon: "mdi-message-alert",
          title: "New Message from Emma",
          content: "Thanks for the recommendation!",
          date: "1w"
        },
        {
          icon: "mdi-account-multiple-check-outline",
          title: "Friend Request Accepted",
          content: "Sophia accepted your friend request.",
          date: "3w"
        },
      ]
    }
  }
};
</script>

<style scoped>
</style>