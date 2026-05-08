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

      <div v-if="notifications.length > 0">
        <v-list class="py-0">
          <template v-for="notification in notifications">
            <v-list-item
              slim
              :title="notification.title"
              class="py-2"
            >
              <template v-slot:prepend>
                <v-icon :color="notification.type">{{ icon(notification.type) }}</v-icon>
              </template>

              <template v-slot:title>
                <span>{{ notification.title }}</span>
              </template>

              <template v-slot:subtitle>
                <span class="text-caption opacity-75">{{ notification.content }}</span>
              </template>

              <template v-slot:append>
                <v-divider vertical opacity="20%" color="indigo"></v-divider>

                <div class="d-flex flex-column align-center pl-2">
                  <v-btn
                    icon="mdi-trash-can-outline"
                    color="error"
                    size="small"
                    height="25px"
                    width="25px"
                    variant="text"
                    @click="deleteNotification(notification.id)"
                  ></v-btn>
                </div>
              </template>

              <span class="notification-date">{{ formatDate(notification.created_at, now) }}</span>
            </v-list-item>

            <v-divider class="ml-15" color="indigo"></v-divider>
          </template>
        </v-list>

        <v-btn
          v-if="notifications.length > 0"
          size="small"
          density="compact"
          slim
          append-icon="mdi-trash-can-outline"
          class="clear-btn text-error"
          @click="clearNotifications"
        >
          CLEAR ALL
        </v-btn>
      </div>

      <div v-if="notifications.length == 0"
        class="d-flex justify-center"
      >
        <span class="my-6 opacity-50">No Notifications</span>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';
import { formatDate } from '@/utils/dateUtils';

export default {
  name: "NotificationsMenu",

  data() {
    return {
      menu: false,
    }
  },

  methods: {
    formatDate,

    deleteNotification(notifId) {
      this.$store.dispatch("notificationStore/deleteNotification", notifId)
    },

    clearNotifications() {
      this.$store.dispatch("notificationStore/clearNotifications")
    }
  },

  computed: {
    ...mapState('notificationStore', ['notifications']),

    ...mapState('ui', ['now']),

    icon() {
      return (type) => {
        const icons = {
          success: 'mdi-account-check',
          info: 'mdi-message-outline',
          error: 'mdi-account-remove',
        }
        return icons[type] || "mdi-bell"
      }
    }
  },
};
</script>

<style scoped>
.notification-date {
  position: absolute;
  right: 5px;
  bottom: 0px;
  font-size: xx-small;
  opacity: 50%;
}

.clear-btn {
  position: absolute;
  right: 5px;
  top: 27px;
}
</style>