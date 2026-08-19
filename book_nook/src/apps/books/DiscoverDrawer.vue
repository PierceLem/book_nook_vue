<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    width="300"
    rail-width="64"
    floating
    elevation="0"
    permanent
    class="pt-2 pb-2 pr-0 pl-2"
    :class="{ 'elevation-4': showScrim }"
    @click="railOpen"
  >
    <div class="drawer-content">
      <v-list-item class="pa-2 pb-0">
        <template v-slot:append>
          <v-btn
            v-if="!rail"
            icon="mdi-chevron-left"
            tile
            rounded="lg"
            variant="text"
            color="indigo"
            height="40"
            width="40"
            class="ml-2"
            @click.stop="railClose"
          ></v-btn>
        </template>

        <v-text-field 
          v-model="searchQuery"
          label="Search Books" 
          variant="outlined" 
          density="compact" 
          color="indigo"
          :base-color="rail ? 'indigo-lighten-5' : 'indigo'"
          hide-details 
          prepend-inner-icon="mdi-magnify"
          rounded="lg"
          @click:prepend-inner="searchBooks"
        ></v-text-field>
      </v-list-item>

      <v-expand-transition>
        <v-container 
          v-show="!rail"
          class="title-container"
        >
          <v-divider class="title-divider" color="indigo"></v-divider>
          <span class="text-caption text-indigo px-2">Genres</span>
          <v-divider class="title-divider" color="indigo"></v-divider>
          <v-btn
            color="indigo"
            size="x-small"
            :disabled="!selectedGenres.length"
            @click="filterBooks"
          >
            apply
          </v-btn>
        </v-container>
      </v-expand-transition>

      <v-list
        v-model:selected="selectedGenres"
        density="compact"
        color="indigo"
        nav
        class="genre-list"
        :class="{ 'rail-list': rail }"
        select-strategy="classic"
      >
        <v-list-item
          v-for="genre in genres"
          :key="genre.value"
          :value="genre.value"
          :title="genre.title"
          :prepend-icon="genre.icon"
          :disabled="rail"
          base-color="indigo"
        />
      </v-list>
    </div>
  </v-navigation-drawer>

  <v-fade-transition>
    <div
      v-if="showScrim"
      class="custom-scrim"
      @click="rail = true"
    ></div>
  </v-fade-transition>
</template>

<script>
export default {
  name: "DiscoverDrawer",

  data () {
    return {
      drawer: true,
      rail: true,
      searchQuery: "",
      screenWidth: window.innerWidth,
      selectedGenres: [],
      genres: [
        { title: "Adventure", value: "Adventure", icon: "mdi-compass" },
        { title: "Aliens", value: "Aliens", icon: "mdi-alien" },
        { title: "American poetry", value: "American poetry", icon: "mdi-feather" },
        { title: "Biography & Autobiography", value: "Biography & Autobiography", icon: "mdi-card-account-details" },
        { title: "Business & Economics", value: "Business & Economics", icon: "mdi-briefcase" },
        { title: "Classics", value: "Classics", icon: "mdi-book-open-page-variant" },
        { title: "Comics", value: "Comics", icon: "mdi-view-dashboard-edit" },
        { title: "Dark", value: "Dark", icon: "mdi-emoticon-frown" },
        { title: "Dystopian", value: "Dystopian", icon: "mdi-factory" },
        { title: "Emotional", value: "Emotional", icon: "mdi-heart" },
        { title: "Family", value: "Family", icon: "mdi-account-group" },
        { title: "Fantasy", value: "Fantasy", icon: "mdi-magic-staff" },
        { title: "Fiction", value: "Fiction", icon: "mdi-thought-bubble" },
        { title: "First-Person POV", value: "First-Person POV", icon: "mdi-account" },
        { title: "Graphic Novels", value: "Graphic Novels", icon: "mdi-image-multiple" },
        { title: "Historical Fiction", value: "Historical Fiction", icon: "mdi-fountain-pen" },
        { title: "History", value: "History", icon: "mdi-history" },
        { title: "Home Economics", value: "Home Economics", icon: "mdi-home" },
        { title: "Horror", value: "Horror", icon: "mdi-skull" },
        { title: "Humor", value: "Humor", icon: "mdi-emoticon-happy" },
        { title: "Informative", value: "Informative", icon: "mdi-information" },
        { title: "Inspiring", value: "Inspiring", icon: "mdi-lightbulb-on" },
        { title: "Juvenile Fiction", value: "Juvenile Fiction", icon: "mdi-account-child" },
        { title: "LGBTQ", value: "LGBTQ", icon: "mdi-looks" },
        { title: "Magic", value: "Magic", icon: "mdi-auto-fix" },
        { title: "Mathematics", value: "Mathematics", icon: "mdi-calculator" },
        { title: "Medical", value: "Medical", icon: "mdi-hospital-box" },
        { title: "Murder", value: "Murder", icon: "mdi-pistol" },
        { title: "Mystery", value: "Mystery", icon: "mdi-magnify" },
        { title: "Nonfiction", value: "Nonfiction", icon: "mdi-file-document" },
        { title: "Philosophy", value: "Philosophy", icon: "mdi-head-question" },
        { title: "Poetry", value: "Poetry", icon: "mdi-feather" },
        { title: "Politics", value: "Politics", icon: "mdi-account-tie" },
        { title: "Psychology", value: "Psychology", icon: "mdi-brain" },
        { title: "Religion", value: "Religion", icon: "mdi-church" },
        { title: "Romance", value: "Romance", icon: "mdi-dance-ballroom" },
        { title: "Sad", value: "Sad", icon: "mdi-emoticon-cry-outline" },
        { title: "Science", value: "Science", icon: "mdi-flask" },
        { title: "Science Fiction", value: "Science Fiction", icon: "mdi-rocket" },
        { title: "Space", value: "Space", icon: "mdi-weather-night" },
        { title: "Suspense", value: "Suspense", icon: "mdi-head-alert" },
        { title: "Thriller", value: "Thriller", icon: "mdi-knife" },
        { title: "War", value: "War", icon: "mdi-shield-cross" },
        { title: "Young Adult", value: "Young Adult", icon: "mdi-account-school" },
      ],
    }
  },

  computed: {
    showScrim() {
      return this.screenWidth < 830 && !this.rail && this.drawer;
    },
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    searchBooks() {
      this.$store.dispatch("bookStore/searchBooks", {
        query: this.searchQuery,
        reset: true,
      });
    },

    filterBooks() {
      this.$store.dispatch("bookStore/filterBooks", {
        genres: this.selectedGenres,
        reset: true,
      });
    },

    railClose() {
      this.rail = true;
    },

    railOpen() {
      this.rail = false;
    },

    onResize() {
      this.screenWidth = window.innerWidth;
    },
  }
}
</script>

<style scoped>
:deep(.v-field) {
  --v-field-padding-start: 7px;
}

:deep(.v-field--prepended) {
  padding-inline-start: 8px;
}

:deep(.v-field__input) {
  color: #3F51B5;
}

:deep(.v-field-label) {
  color: #3F51B5;
}

:deep(.v-icon.mdi-magnify) {
  color: #3F51B5;
}

:deep(.v-list-item__content) {
  overflow: visible !important;
}

.v-navigation-drawer {
  background: rgb(255 255 255 / 0%) !important;
}

.genre-list {
  max-height: calc(100vh - 150.8px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.custom-scrim {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.2;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1004;
}

.title-container {
  padding: 0px 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  height: 30px;
}

.title-divider {
  margin-block: 9px;
}

.drawer-content {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: #E8EAF6;
  overflow: hidden;
  transform: translateZ(0);
}

.rail-list {
  overflow-y: hidden !important;
  scrollbar-width: none !important;
}
</style>