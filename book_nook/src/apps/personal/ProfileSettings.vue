<template>
  <div class="d-flex flex-column w-50 h-100 pa-4">
    <v-chip prepend-icon="mdi-cog-outline" size="x-large" color="indigo" variant="elevated" class="mx-auto mb-2">
      Settings
    </v-chip>

    <span class="text-h6 text-indigo font-weight-medium ml-2 mb-1">Notifications</span>

    <div class="d-flex flex-row justify-space-between align-center">
      <span class="text-indigo text-caption">Friend Requests</span>

      <v-switch
        v-model="localSettings.friend_request_notifications"
        color="indigo" 
        density="compact" 
        hide-details
      ></v-switch>
    </div>

    <div class="d-flex flex-row justify-space-between align-center">
      <span class="text-indigo text-caption">Thread Messages</span>

      <v-switch
        v-model="localSettings.message_notifications"
        color="indigo" 
        density="compact" 
        hide-details
      ></v-switch>
    </div>

    <span class="text-h6 text-indigo font-weight-medium ml-2 mb-1">Personal</span>

    <div class="d-flex flex-row justify-space-between align-center">
      <span class="text-indigo text-caption">Auto-accept friend requests</span>

      <v-switch
        v-model="localSettings.auto_accept_friend_requests"
        color="indigo" 
        density="compact" 
        hide-details
      ></v-switch>
    </div>

    <v-expand-transition>
      <div v-if="hasChanges" class="d-flex justify-end mt-4">
        <v-btn
          color="indigo"
          variant="elevated"
          @click="saveSettings"
        >
          Save Changes
        </v-btn>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: "ProfileSettings",

  data() {
    return {
      localSettings: {
        friend_request_notifications: false,
        message_notifications: false,
        auto_accept_friend_requests: false,
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    hasChanges() {
      return (
        this.localSettings.friend_request_notifications !== this.user.friend_request_notifications ||
        this.localSettings.message_notifications !== this.user.message_notifications ||
        this.localSettings.auto_accept_friend_requests !== this.user.auto_accept_friend_requests
      );
    },
  },

  created() {
    this.syncLocalSettings();
  },

  watch: {
    "user.friend_request_notifications"() {
      this.syncLocalSettings();
    },
    "user.message_notifications"() {
      this.syncLocalSettings();
    },
    "user.auto_accept_friend_requests"() {
      this.syncLocalSettings();
    },
  },

  methods: {
    syncLocalSettings() {
      this.localSettings = {
        friend_request_notifications: this.user.friend_request_notifications,
        message_notifications: this.user.message_notifications,
        auto_accept_friend_requests: this.user.auto_accept_friend_requests,
      };
    },

    saveSettings() {
      this.$store.dispatch('auth/updateProfile', this.localSettings)
    },
  },
};
</script>

<style scoped>
:deep(.v-input--density-compact) {
  --v-input-control-height: 28px !important;
}

:deep(.v-switch__track) {
  height: 8px;
  min-width: 26px;
}

:deep(.v-switch__thumb) {
  height: 13px;
  width: 13px;
}
</style>