<template>
  <div class="d-flex flex-column w-50 h-100 pa-4">
    <v-chip prepend-icon="mdi-cog-outline" size="x-large" color="indigo" variant="elevated" class="mx-auto mb-2">
      Settings
    </v-chip>

    <span class="text-h6 text-indigo font-weight-medium ml-2 mb-1">Notifications</span>

    <div class="d-flex flex-row justify-space-between align-center">
      <span class="text-indigo text-caption">Friend Requests</span>
      <v-switch color="indigo" density="compact" hide-details></v-switch>
    </div>
    <div class="d-flex flex-row justify-space-between align-center">
      <span class="text-indigo text-caption">Thread Messages</span>
      <v-switch color="indigo" density="compact" hide-details></v-switch>
    </div>
    <div class="d-flex flex-row justify-space-between align-center mb-4">
      <span class="text-indigo text-caption">Book Recommendations</span>
      <v-switch color="indigo" density="compact" hide-details></v-switch>
    </div>

    <span class="text-h6 text-indigo font-weight-medium ml-2 mb-1">Personal</span>

    <div class="d-flex flex-row justify-space-between align-center">
      <span class="text-indigo text-caption">Auto-accept friend requests</span>
      <v-switch color="indigo" density="compact" hide-details></v-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSettings",
  
  data() {
    return {
    };
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