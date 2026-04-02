<template>
  <v-navigation-drawer 
    v-model="drawer"
    floating
    :mobile-breakpoint="700"
    width="260"
    class="pt-2 pb-2 pr-0 pl-2"
  >
    <div class="drawer-content">
      <div class="d-flex align-center justify-space-between pt-2 pb-1">
        <span class="ml-6 text-h5 text-indigo">
          Threads
        </span>

        <v-spacer></v-spacer>

        <v-btn 
          size="small"
          variant="plain"
          color="indigo"
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

          <CreateThread @menu-state-change="toggleMenu" />
        </v-btn>
      </div>

      <v-text-field 
        v-model="searchQuery"
        label="Search Threads" 
        variant="outlined" 
        density="compact" 
        color="indigo"
        base-color="indigo"
        hide-details 
        prepend-inner-icon="mdi-magnify" 
        rounded="lg"
        class="px-1"
      ></v-text-field>

      <v-list
        density="compact"
        base-color="indigo"
        nav
        class="thread-list py-0 px-1"
      >
        <v-list-item 
          v-for="thread in threads"
          :key="thread.id"
          color="indigo"
          slim
          subtitle="Insert last received message here."
          class="thread-item py-1 pr-2 pl-1 my-1"
          @click="threadSelect(thread)"
        >
          <template v-slot:prepend>
            <v-badge
              dot
              color="red"
            >
              <v-avatar :image="thread.thread_avatar"></v-avatar>
            </v-badge>
          </template>

          <template v-slot:title>
            <div class="d-flex flex-column">
              <span class="text-end date-text pr-1">date</span>
              <span>{{ thread.display_name }}</span>
            </div>
          </template>
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
      searchQuery: '',
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

    threads() {
      return this.$store.state.threadStore.threads;
    }
  },

  methods: {
    threadSelect(thread) {
      this.$store.dispatch('threadStore/selectThread', thread)
    },

    toggleMenu(newState) {
      this.menuState = newState
    },

    ...mapActions("ui", ["setChatDrawer"]),
  },
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
  background-color: #E8EAF6;
  overflow: hidden;
}

.thread-list {
  height: calc(100vh - 172px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.thread-item {
  transition: background-color 0.3s ease;
  border-radius: 25px;
}

.thread-item:hover {
  background-color: white;
  cursor: pointer;
}

.date-text {
  font-size: x-small;
  opacity: 0.5;
  line-height: 10px;
}
</style>