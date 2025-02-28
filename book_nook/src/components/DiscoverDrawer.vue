<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    width="300"
    permanent
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
          class="ml-1"
          @click.stop="railClose"
        ></v-btn>
      </template>

      <v-text-field 
        label="Search Books" 
        variant="solo-filled" 
        density="compact" 
        hide-details 
        prepend-inner-icon="mdi-magnify" 
        rounded="lg"
      ></v-text-field>
    </v-list-item>

    <v-divider></v-divider>

    <v-container 
      v-if="!rail" 
      class="pt-2 pb-0 mb-0 d-flex flex-row align-center justify-space-between"
    >
      <v-divider></v-divider>
      <span class="text-caption px-2">Popular&nbsp;Genres</span>
      <v-divider></v-divider>
    </v-container>

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
            ref="genreRefs"
          ></v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DiscoverDrawer",

  data () {
    return {
      drawer: true,
      rail: true,
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
    }
  },
}
</script>

<style scoped>
:deep(.v-field--variant-solo-filled) {
  box-shadow: none;
}

:deep(.v-field--prepended) {
  padding-inline-start: 7px;
}

:deep(.v-field.v-field--prepended) {
  --v-field-padding-start: 5px;
}

.genre-list {
  max-height: calc(100vh - 148.8px);
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>