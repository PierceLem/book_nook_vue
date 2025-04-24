<template>
  <v-navigation-drawer 
    v-model="drawer"
    floating
    :mobile-breakpoint="700"
    width="260"
    class="pt-1 pb-2 pr-0 pl-2"
  >
    <div class="drawer-content">
      <div class="d-flex align-center justify-space-between pt-2 pb-1">
        <span class="ml-6 text-h5 text-indigo-darken-3">
          Threads
        </span>

        <v-spacer></v-spacer>

        <v-btn 
          size="small"
          variant="plain"
          color="indigo-darken-3"
          icon
          class="mr-2"
          @click="toggleMenu"
        >
          <v-icon size="large">
            mdi-chat-plus-outline
          </v-icon>

          <v-tooltip 
            activator="parent"
            location="bottom" 
            offset="5" 
            open-delay="800"
            :open-on-hover="!menuState"
          >
            <span class="text-caption">Create Thread</span>
          </v-tooltip>

          <CreateThread @menuStateChange="toggleMenu" />
        </v-btn>
      </div>

      <v-text-field 
        v-model="searchQuery"
        label="Search Threads" 
        variant="solo" 
        density="compact" 
        bg-color="indigo-lighten-3"
        hide-details 
        prepend-inner-icon="mdi-magnify" 
        rounded="lg"
        class="px-1"
        @click:prepend-inner="$emit('query', searchQuery)"
      ></v-text-field>

      <v-list
        density="compact"
        base-color="indigo-darken-3"
        nav
        class="thread-list py-0 px-1"
      >
        <v-list-item 
          v-for="n in 12"
          :key="n"
          color="indigo-darken-3"
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Insert thread name"
          subtitle="Insert last received message here."
          class="thread-item py-2 px-2 my-1"
        >
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateThread from './CreateThread.vue';

export default {
  name: "ChatList",
  components: {
    CreateThread,
  },

  data() {
    return {
      menuState: false,
    }
  },

  computed: {
    ...mapGetters("ui", ["isChatDrawerOpen"]),
    drawer: {
      get() {
        return this.isChatDrawerOpen;
      },
      set(value) {
        this.setChatDrawer(value);
      },
    },
  },

  methods: {
    toggleMenu(newState) {
      this.menuState = newState
    },
    ...mapActions("ui", ["setChatDrawer"]),
  },
}
</script>

<style scoped>
:deep(.v-field) {
  transition: background-color 0.3s ease;
  --v-field-padding-start: 7px;
}

:deep(.v-field--active) {
  background-color: #303F9F !important; /* Your custom color */
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
  color: #ffffff; /* Active/focused color */
}

:deep(.v-field-label) {
  color: #1A237E; /* Inactive color */
  opacity: 1;
}

:deep(.v-field--active .v-icon.mdi-magnify) {
  color: #ffffff; /* Different color when focused, if desired */
}

:deep(.v-icon.mdi-magnify) {
  color: #1A237E; /* Your custom color */
  opacity: 1;
}

.v-navigation-drawer--temporary.v-navigation-drawer--active {
  box-shadow: none !important;
}

.v-navigation-drawer {
  background: rgb(255 255 255 / 0%) !important;
}

.drawer-content {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: #C5CAE9;
  overflow: hidden;
}

.thread-list {
  max-height: calc(100vh - 168px);
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