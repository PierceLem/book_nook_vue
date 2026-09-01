<template>
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
      <p class="text-caption">{{ user.bio || "No bio" }}</p>
    </v-card>

    <div v-if="isEditing" class="pa-0">
      <v-textarea 
        v-model="newBio" 
        label="Edit Bio" 
        variant="outlined" 
        color="indigo"
        base-color="indigo"
        counter="400"
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

    <div class="d-block mt-4">
      <span class="text-indigo text-caption font-weight-black">date joined: </span>
      <span class="text-indigo text-caption">{{ formatDate(user.date_joined) }}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/dateUtils';

export default {
  name: "AboutProfile",

  data() {
    return {
      newBio: "",
      isEditing: false,
      rules: {
        bio: [
          value => value.length <= 400 || "Maximum 400 characters allowed."
        ]
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },

  watch: {
    "user.bio": {
      immediate: true,
      handler(newBio) {
        this.newBio = newBio || "";
      },
    },
  },

  methods: {
    submitBio() {
      const newBio = this.newBio.trim();
      const currentBio = (this.user.bio || "").trim();

      if (!newBio) {
        return;
      }

      if (newBio === currentBio) {
        return;
      }

      this.$store.dispatch("auth/updateProfile", { bio: newBio })
        .then(() => {
          this.isEditing = false;
        })
        .catch(error => {
          console.error("Error updating bio:", error);
        });
    },

    formatDate
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
</style>