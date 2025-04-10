<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    width="300"
    elevation="0"
    permanent
    :class="{ 'elevation-4': showScrim }"
    @click="railOpen"
  >
    <v-list-item class="pa-2">
      <template v-slot:append>
        <v-btn
          v-if="!rail"
          icon="mdi-chevron-left"
          variant="text"
          height="32"
          width="32"
          class="ml-2"
          @click.stop="railClose"
        ></v-btn>
      </template>

      <v-text-field 
        v-model="searchQuery"
        label="Search Books" 
        variant="solo" 
        density="compact" 
        hide-details 
        prepend-inner-icon="mdi-magnify" 
        rounded="lg"
        @click:prepend-inner="$emit('query', searchQuery)"
      ></v-text-field>
    </v-list-item>

    <v-divider></v-divider>

    <v-expand-transition>
      <v-container 
        v-if="titleState"
        class="title-container"
      >
        <v-divider class="title-divider"></v-divider>
        <span class="text-caption px-2">Popular&nbsp;Genres</span>
        <v-divider class="title-divider"></v-divider>
      </v-container>
    </v-expand-transition>

    <v-list 
      density="compact" 
      nav 
      class="genre-list"
    >
      <template 
        v-for="(category, index) in categories" 
        :key="index"
      >
        <v-list-group 
          ref="categoryRefs"
        >
          <template v-slot:activator="{ props }">
            <v-list-item 
              v-bind="props" 
              :prepend-icon="category.icon" 
              :title="category.name" 
              :disabled="rail"
              @click="openGroup(index, category)"
              ref="activatorRefs"
              class="pl-2 activator"
            ></v-list-item>
          </template>

          <v-list-item 
            v-for="genre in category.genres" 
            :key="genre.value" 
            :title="genre.title" 
            :value="genre.value"
            @click="$emit('setGenre', genre)"
            ref="genreRefs"
          ></v-list-item>
        </v-list-group>
      </template>
    </v-list>
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
      titleState: false,
      screenWidth: window.innerWidth,
      categories: [
        {
          name: "Fiction",
          icon: "mdi-book-open-page-variant",
          open: false,
          genres: [
            { title: "Fantasy", value: "fantasy" },
            { title: "Science Fiction", value: "science-fiction" },
            { title: "Mystery & Thriller", value: "mystery-thriller" },
            { title: "Historical Fiction", value: "historical-fiction" },
            { title: "Horror", value: "horror" },
            { title: "Romance", value: "romance" },
            { title: "Adventure", value: "adventure" },
            { title: "Contemporary Fiction", value: "contemporary-fiction" },
            { title: "Dystopian", value: "dystopian" },
            { title: "Literary Fiction", value: "literary-fiction" },
          ],
        },
        {
          name: "Non-Fiction",
          icon: "mdi-book",
          open: false,
          genres: [
            { title: "Biography & Memoir", value: "biography-memoir" },
            { title: "Self-Help", value: "self-help" },
            { title: "Psychology", value: "psychology" },
            { title: "Philosophy", value: "philosophy" },
            { title: "Business & Economics", value: "business-economics" },
            { title: "Politics & Government", value: "politics-government" },
            { title: "History", value: "history" },
            { title: "Science & Technology", value: "science-technology" },
            { title: "Health & Wellness", value: "health-wellness" },
            { title: "True Crime", value: "true-crime" },
          ],
        },
        {
          name: "Academic & Reference",
          icon: "mdi-school",
          open: false,
          genres: [
            { title: "Textbooks", value: "textbooks" },
            { title: "Law", value: "law" },
            { title: "Medicine", value: "medicine" },
            { title: "Engineering", value: "engineering" },
            { title: "Mathematics", value: "mathematics" },
            { title: "Social Sciences", value: "social-sciences" },
            { title: "Education", value: "education" },
            { title: "Computer Science", value: "computer-science" },
            { title: "Linguistics", value: "linguistics" },
            { title: "Art & Design", value: "art-design" },
          ],
        },
        {
          name: "Children & Young Adult",
          icon: "mdi-book-variant",
          open: false,
          genres: [
            { title: "Young Adult Fiction", value: "young-adult-fiction" },
            { title: "Young Adult Fantasy", value: "young-adult-fantasy" },
            { title: "Children's Picture Books", value: "children-picture-books" },
            { title: "Middle Grade Fiction", value: "middle-grade-fiction" },
            { title: "Fairy Tales & Folklore", value: "fairy-tales-folklore" },
          ],
        },
        {
          name: "Miscellaneous",
          icon: "mdi-bookshelf",
          open: false,
          genres: [
            { title: "Graphic Novels & Comics", value: "graphic-novels-comics" },
            { title: "Poetry", value: "poetry" },
            { title: "Travel", value: "travel" },
            { title: "Cooking & Food", value: "cooking-food" },
            { title: "Religion & Spirituality", value: "religion-spirituality" },
          ],
        },
      ],
    }
  },

  emits: ['setGenre', 'query'],

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
    railClose() {
      this.$refs.categoryRefs.forEach((category, index) => {
        if (category.isOpen) {
          this.$nextTick(() => {
            const activator = this.$refs.activatorRefs?.[index]?.$el;
            if (activator) {
              activator.click();
            }
          })
        }
      });
      this.titleState = false;
      this.rail = true;
    },

    railOpen() {
      if (this.rail) {
        this.$refs.genreRefs.forEach((genre) => {
          if (genre.isSelected) {
            this.$nextTick(() => {
              const group = genre.$el.closest(".v-list-group");
              const activator = group.querySelector(".activator");

              activator.click();
            })
          }
        });
        this.titleState = true;
        this.rail = false;
      }
    },

    openGroup(groupIndex, openedCategory) {
      this.$refs.categoryRefs.forEach((category, index) => {
        if (category.isOpen && index != groupIndex && !openedCategory.open) {
          const activator = this.$refs.activatorRefs?.[index]?.$el;
          if (activator) {
            activator.click();
          }
        }
      });
      openedCategory.open = !openedCategory.open;
    },

    onResize() {
      this.screenWidth = window.innerWidth;
    },
  },
}
</script>

<style scoped>
:deep(.v-field--variant-solo-filled) {
  box-shadow: none;
}

:deep(.v-field--prepended) {
  padding-inline-start: 8px;
}

:deep(.v-field.v-field--prepended) {
  --v-field-padding-start: 7px;
}

:deep(.v-list-item__content) {
  overflow: visible !important;
}

.genre-list {
  max-height: calc(100vh - 150.8px);
  overflow-y: auto;
  scrollbar-width: thin;
}

.custom-scrim {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background: black;
  opacity: 0.2;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1005;
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
</style>