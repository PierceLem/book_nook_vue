<template>
  <div class="d-flex flex-row h-100 w-100">
    <div 
      class="d-flex flex-column flex-grow-1 ml-4 mb-4 mt-15 bg-indigo-lighten-4 rounded-xl position-relative" 
      style="overflow: visible;"
    >
      <ProfileCard />

      <div class="d-flex flex-row w-100 h-100 pa-4" style="margin-top: 130px;">
        <div class="d-flex flex-column w-50 h-100 pa-4">
          <v-chip prepend-icon="mdi-account-details" size="x-large" color="indigo" variant="elevated" class="mx-auto mb-2">
            About
          </v-chip>

          <div class="d-flex flex-row justify-space-between align-center px-2">
            <span class="text-h6 text-indigo font-weight-medium">bio</span>

            <v-btn
              :icon="isEditing ? 'mdi-undo-variant' : 'mdi-square-edit-outline'"
              variant="text"
              color="indigo"
              tile
              flat
              size="25px"
              rounded
              @click="isEditing = !isEditing"
            ></v-btn>
          </div>

          <v-card
            variant="text"
            rounded="lg"
            color="indigo"
            class="pl-0 pr-2 py-2"
            v-if="!isEditing" 
          >
            <p class="text-caption">{{ bio }}</p>
          </v-card>

          <div v-if="isEditing" class="pa-0">
            <v-textarea 
              v-model="newBio" 
              label="Edit Bio" 
              variant="outlined" 
              color="indigo"
              base-color="indigo"
              counter="200"
              rounded="lg"
              rows="4" 
              auto-grow 
              max-rows="8"
              hide-details="auto" 
              density="compact" 
              class="pt-2 bio-input"
              :rules="rules.bio"
            >
              <template v-slot:append-inner>
                <v-btn 
                  icon="mdi-check" 
                  variant="tonal" 
                  color="indigo"
                  height="20px" 
                  width="20px" 
                  size="x-small" 
                  @click="submitBio"
                ></v-btn>
              </template>
            </v-textarea>
          </div>

          <span class="text-indigo text-caption font-weight-black mt-4">Socials: </span>

          <div class="d-flex flex-column pl-2">
            <div class="d-block mb-1">
              <v-icon color="indigo" class="mr-1">mdi-instagram</v-icon>
              <v-btn
                append-icon="mdi-plus"
                variant="tonal"
                color="indigo"
                size="x-small"
                text="add account"
                class=""
              ></v-btn>
            </div>

            <div class="d-block mb-1">
              <v-icon color="indigo" class="mr-1">mdi-facebook</v-icon>
              <v-btn
                append-icon="mdi-plus"
                variant="tonal"
                color="indigo"
                size="x-small"
                text="add account"
                class=""
              ></v-btn>
            </div>

            <div class="d-block">
              <v-icon color="indigo" class="mr-1">mdi-github</v-icon>
              <v-btn
                append-icon="mdi-plus"
                variant="tonal"
                color="indigo"
                size="x-small"
                text="add account"
                class=""
              ></v-btn>
            </div>
          </div>
          <div class="d-block mt-4">
            <span class="text-indigo text-caption font-weight-black">date joined: </span>
            <span class="text-indigo text-caption">Today</span>
          </div>
        </div>

        <v-divider vertical opacity="35%" thickness="2" color="indigo" class="custom-shadow-divider"></v-divider>

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
      </div>
    </div>
    <div class="d-flex flex-column mx-4 mt-3 mb-4 bg-indigo-lighten-4 rounded-xl" color="indigo" style="min-width: 300px; overflow: hidden;">
      <v-tabs
        v-model="tab"
        align-tabs="center"
        density="comfortable"
        bg-color="indigo"
        color="white"
      >
        <v-tab width="100px" :value="1">Friends</v-tab>
        <v-tab width="100px" :value="2">Search</v-tab>
        <v-tab width="100px" :value="3">Requests</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item
          v-for="n in 3"
          :key="n"
          :value="n"
          class="px-1"
        >
          <v-text-field 
            v-model="searchQuery"
            label="Search Friends" 
            variant="solo" 
            density="compact" 
            bg-color="indigo-lighten-3"
            hide-details 
            prepend-inner-icon="mdi-magnify" 
            rounded="lg"
            class="px-1 pt-1"
            @click:prepend-inner="$emit('query', searchQuery)"
          ></v-text-field>

          <v-list
            density="compact"
            base-color="indigo-darken-3"
            nav
            class="thread-list pt-0 pb-1 px-1"
          >
            <v-list-item 
              v-for="n in 12"
              :key="n"
              color="indigo-darken-3"
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              title="Username"
              subtitle="Email@example.com"
              class="thread-item py-2 px-2 my-1"
            >
            </v-list-item>
          </v-list>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script>
import ProfileCard from '@/components/ProfileCard.vue';

export default {
  name: "MyProfile",

  components: {
    ProfileCard,
  },
  
  data() {
    return {
      bio: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
      newBio: "",
      isEditing: false,
      searchQuery: "",
      rules: {
        bio: [
          value => !!value || "Bio cannot be empty",
          value => value.length <= 400 || `Maximum 200 characters allowed).`
        ]
      },
      tab: null,
    }
  },

  methods: {
    submitBio() {
      this.bio = this.newBio;
      this.isEditing = false;
    },
  }
};
</script>

<style scoped>
.custom-shadow-divider {
  mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
}

.bio-input :deep(.v-field__input) {
  font-size: 0.75rem;
}

.bio-input :deep(.v-label) {
  color: #3f51b5;
}

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

:deep(.v-field) {
  transition: background-color 0.3s ease;
  --v-field-padding-start: 7px;
}

:deep(.v-field--active) {
  background-color: #303F9F !important;
  opacity: 1;
  transition: background-color 0.3s ease;
}

:deep(.v-field--variant-solo) {
  box-shadow: none !important;
}

:deep(.v-field--prepended) {
  padding-inline-start: 8px;
}

:deep(.v-field--active .v-field-label) {
  color: #ffffff;
}

:deep(.v-field-label) {
  color: #1A237E;
  opacity: 1;
}

:deep(.v-field--active .v-icon.mdi-magnify) {
  color: #ffffff;
}

:deep(.v-icon.mdi-magnify) {
  color: #1A237E;
  opacity: 1;
}

.thread-list {
  max-height: calc(100vh - 180px);
  background-color: #C5CAE9;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: rgba(26, 35, 126, 0.5) transparent;
}

.thread-item {
  transition: background-color 0.3s ease;
  border-radius: 24px;
}

.thread-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>