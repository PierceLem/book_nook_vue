<template>
  <v-container 
    class="d-flex flex-column pa-0 ma-0" 
    min-width="100%"
  >
    <v-card 
      height="60%" 
      min-height="250px"
      rounded="xl" 
      elevation="10"
      class="mx-2 mt-2 card-border gradient-overlay" 
      image="https://wallpaperaccess.com/full/253342.jpg"
    >
    </v-card>

    <v-card 
      elevation="10"
      rounded="xl" 
      class="mx-8 d-flex flex-column profile-card card-border"
    >
      <v-avatar 
        image="https://randomuser.me/api/portraits/women/85.jpg" 
        size="100px" 
        class="profile-avatar"
      >
      </v-avatar>

      <v-container 
        class="py-0 pr-0 ma-0 d-flex flex-column" 
        height="60px" 
        min-width="100%" 
        style="padding-left: 160px;"
      >
        <span class="text-h5 pt-2">Parcwilleous</span>
        <span class="text-caption text-medium-emphasis">Parcwill@gmail.com</span>
      </v-container>

      <v-container 
        class="d-flex flex-row mx-0 pa-0" 
        min-width="100%"
      >
        <v-col 
          cols="4" 
          class="d-flex flex-column"
        >
          <v-list>
            <v-list-item 
              density="compact" 
              class="py-0"
            >
              <template v-slot:append>
                <v-btn
                  height="30px"
                  width="30px"
                  :icon="bioIcon"
                  variant="text"
                  rounded
                  @click="isEditing = !isEditing"
                ></v-btn>
              </template>
              <template v-slot:prepend>
                <span class="text-h6">Bio</span>
              </template>
            </v-list-item>

            <v-list-item 
              v-if="!isEditing" 
              border="none" 
              rounded="lg" 
              class="bg-blue-grey-lighten-5 py-2 mt-2"
            >
              <p class="text-caption">{{ bio }}</p>
            </v-list-item>

            <v-list-item v-if="isEditing" class="pa-0">
              <v-textarea 
                v-model="newBio" 
                label="New Bio" 
                variant="outlined" 
                rounded="lg"
                rows="4" 
                auto-grow 
                max-rows="8"
                hide-details="auto" 
                density="compact" 
                class="pt-2"
                :rules="rules.bio"
              >
                <template v-slot:append-inner>
                  <v-btn 
                    icon="mdi-check" 
                    variant="tonal" 
                    height="20px" 
                    width="20px" 
                    size="x-small" 
                    @click="submitBio"
                  ></v-btn>
                </template>
              </v-textarea>
            </v-list-item>

            <v-list-item 
              prepend-icon="mdi-email-outline" 
              density="compact"  
              class="py-0 mt-4" 
              slim
            >
              <span class="text-body-2">Parcwill@gmail.com</span>
            </v-list-item>

            <v-list-item 
              density="compact" 
              class="py-0"
            >
              <span class="text-caption text-medium-emphasis">joined: Dec. 4, 2024</span>
            </v-list-item>
          </v-list>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col
          cols="4" 
          class="d-flex flex-column"
        >
          <v-list>
            <v-list-item 
              class="py-0" 
              density="compact"
            >
              <span class="text-h6">Favourites</span>
            </v-list-item>

            <v-list-item class="pa-0">
              <v-window
                v-model="window"
                show-arrows
                direction="horizontal"
              >
                <template v-slot:prev="{ props }">
                  <v-btn
                    icon="mdi-chevron-double-left"
                    height="32"
                    width="32"
                    variant="text"
                    @click="props.onClick"
                  >
                  </v-btn>
                </template>

                <template v-slot:next="{ props }">
                  <v-btn
                    icon="mdi-chevron-double-right"
                    height="32"
                    width="32"
                    variant="text"
                    @click="props.onClick"
                  >
                  </v-btn>
                </template>

                <v-window-item
                  v-for="n in length"
                  :key="n"
                >
                  <v-container 
                    class="d-flex flex-column justify-center align-center pa-0 ma-0 mt-3" 
                    min-width="100%" 
                    height="250"
                    max-height="250"
                  >
                    <v-sheet 
                      width="40%" 
                      max-width="125"
                      elevation="6" 
                      rounded="lg" 
                      style="overflow: hidden;"
                    >
                      <v-img 
                        src="@/assets/book-cover.jpg" 
                        cover
                      ></v-img>
                    </v-sheet>
                    
                    <span class="text-body-1 mt-2">The Great Gatsby</span>

                    <span class="text-caption">J.K. Rowling</span>
                  </v-container>
                </v-window-item>
              </v-window>
            </v-list-item>
          </v-list>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col 
          cols="4" 
          class="d-flex flex-column"
        >
          <v-list>
            <v-list-item 
              class="py-0" 
              density="compact"
            >
              <span class="text-h6">Friends List</span>
            </v-list-item>
            
            <v-list-item class="px-2">
              <input 
                v-model="searchQuery"
                class="custom-input" 
                type="text" 
                placeholder="Search Users" 
              />
              <i class="input-icon mdi mdi-magnify"></i>
            </v-list-item>

            <v-divider class="pa-0 ma-0"></v-divider>

            <v-list 
              class="pa-0 ma-0" 
              max-height="350px"
              style="scrollbar-width: thin;"
            >
              <template v-for="user in filteredUsers" :key="user.id">
                <ListUsers
                  :name="user.name"
                  :email="user.email"
                  :avatar="user.avatar"
                  btnType="text"
                  icon="mdi-account-minus-outline"
                  :disabled="false"
                />
              </template>
            </v-list>
          </v-list>
        </v-col>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ListUsers from '@/components/ListUsers.vue';

export default {
  name: "MyProfile",

  components: {
    ListUsers,
  },

  data() {
    return {
      bio: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
      newBio: "",
      isEditing: false,
      searchQuery: "",
      rules: {
        bio: [value => !!value || "Bio cannot be empty"]
      },
      length: 3,
      window: 0,
    }
  },

  methods: {
    submitBio() {
      this.bio = this.newBio;
      this.isEditing = false;
    },
  },

  computed: {
    bioIcon() {
      return this.isEditing ? "mdi-undo-variant" : "mdi-pencil";
    },

    ...mapGetters("auth", ["allUsers"]),

    filteredUsers() {
      if (!this.searchQuery) return this.allUsers;

      const query = this.searchQuery.toLowerCase();

      return this.allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
.gradient-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgb(96, 125, 139, 0.5), rgb(55, 71, 79, 0.6));
  z-index: 1;
  border-radius: inherit;
}

:deep(textarea) {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.667;
  letter-spacing: 0.0333333333em;
  scrollbar-width: none;
}

:deep(.v-window__controls) {
  padding: 0;
}

.profile-card {
  position: relative;
  top: -40px;
  overflow: visible;
}

.card-border {
  border-width: 3px;
  border-color: #607D8B;
}

.profile-avatar {
  position: absolute;
  border-width: 4px;
  border-color: white;
  top: -50px;
  left: 50px;
}

.custom-input {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px 8px 30px;
  font-size: 12px;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.custom-input:focus {
  outline: none;
}
</style>