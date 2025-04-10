<template>
  <v-navigation-drawer 
    v-model="drawer"
    floating
    :mobile-breakpoint="700"
    width="260"
    border="e"
  >
    <v-list>
      <div class="d-flex align-center pt-1">
        <v-list-item-title class="ml-6 text-h5">
          Threads
        </v-list-item-title>

        <v-spacer></v-spacer>

        <v-btn 
          size="small"
          variant="plain"
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
            :open-on-hover="!menuState"
          >
            <span class="text-caption">Create Thread</span>
          </v-tooltip>

          <CreateThread @menuStateChange="toggleMenu" />
        </v-btn>
      </div>
    </v-list>

    <v-list-item class="px-2">
      <input 
        class="custom-input" 
        type="text" 
        placeholder="Search Threads" 
      />

      <i class="input-icon mdi mdi-magnify"></i>
    </v-list-item>

    <v-list
      density="compact"
      nav
      class="thread-list"
    >
      <v-list-item 
        v-for="n in 12"
        :key="n"
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Insert thread name"
        subtitle="Insert last received message here."
        class="thread-item pa-2 my-2"
      >
        <v-badge
          color="green"
          content="1"
          overlap
          class="thread-badge"
        ></v-badge>
      </v-list-item>
    </v-list>
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
.custom-input {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px 8px 30px;
  font-size: 12px;
  width: 100%;
  max-width: 300px;
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

.thread-list {
  max-height: calc(100vh - 168px);
  overflow-y: auto;
  scrollbar-width: none;
}

.thread-list::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.thread-item {
  transition: background-color 0.3s ease;
  position: relative;
}

.thread-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.thread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 1;
}

.thread-badge ::v-deep(.v-badge__badge) {
  position: absolute !important;
  bottom: auto !important;
  left: auto !important;
  transform: translateX(-100%) !important;
  transform-origin: top right;
}
</style>