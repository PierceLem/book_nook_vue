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
        >
          Add Account
          <v-menu 
            activator="parent"
            :close-on-content-click="false"
            location="bottom"
          >
            <v-card class="px-1 pb-1 pt-2">
              <v-text-field 
                label="Account Username" 
                density="compact"
                variant="underlined" 
                hide-details="auto"
                width="200px"
                v-model="instagramHandle"
              >
                <template v-slot:append-inner>
                  <v-btn 
                    height="20px" 
                    width="20px" 
                    size="x-small" 
                    icon="mdi-check" 
                    variant="tonal"
                  >
                  </v-btn>
                </template>
              </v-text-field>
            </v-card>
          </v-menu>
        </v-btn>
      </div>

      <div class="d-block mb-1">
        <v-icon color="indigo" class="mr-1">mdi-facebook</v-icon>

        <v-btn
          append-icon="mdi-plus"
          variant="tonal"
          color="indigo"
          size="x-small"
          text="add account"
        >
          Add Account
          <v-menu 
            activator="parent"
            :close-on-content-click="false"
            location="bottom"
          >
            <v-card class="px-1 pb-1 pt-2">
              <v-text-field 
                label="Account Username" 
                density="compact"
                variant="underlined" 
                hide-details="auto"
                width="200px"
                v-model="facebookHandle"
              >
                <template v-slot:append-inner>
                  <v-btn 
                    height="20px" 
                    width="20px" 
                    size="x-small" 
                    icon="mdi-check" 
                    variant="tonal"
                  >
                  </v-btn>
                </template>
              </v-text-field>
            </v-card>
          </v-menu>
        </v-btn>
      </div>

      <div class="d-block">
        <v-icon color="indigo" class="mr-1">mdi-github</v-icon>

        <v-btn
          append-icon="mdi-plus"
          variant="tonal"
          color="indigo"
          size="x-small"
          text="add account"
        >
          Add Account
          <v-menu 
            activator="parent"
            :close-on-content-click="false"
            location="bottom"
          >
            <v-card class="px-1 pb-1 pt-2">
              <v-text-field 
                label="Account Username" 
                density="compact"
                variant="underlined" 
                hide-details="auto"
                width="200px"
                v-model="githubHandle"
              >
                <template v-slot:append-inner>
                  <v-btn 
                    height="20px" 
                    width="20px" 
                    size="x-small" 
                    icon="mdi-check" 
                    variant="tonal"
                  >
                  </v-btn>
                </template>
              </v-text-field>
            </v-card>
          </v-menu>
        </v-btn>
      </div>
    </div>
    <div class="d-block mt-4">
      <span class="text-indigo text-caption font-weight-black">date joined: </span>
      <span class="text-indigo text-caption">Today</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutProfile",

  data() {
    return {
      bio: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
      newBio: "",
      instagramHandle: '',
      facebookHandle: '',
      githubHandle: '',
      isEditing: false,
      searchQuery: "",
      rules: {
        bio: [
          value => !!value || "Bio cannot be empty",
          value => value.length <= 400 || `Maximum 200 characters allowed).`
        ]
      },
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
</style>