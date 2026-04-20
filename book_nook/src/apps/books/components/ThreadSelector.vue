<template>
  <v-menu 
    v-model="menu"
    activator="parent" 
    location="right"
    :close-on-content-click="false"
  >
    <v-card class="pa-1">
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
        class="px-1 pt-1"
      ></v-text-field>

      <v-list
        density="compact"
        color="indigo"
        base-color="indigo"
        nav
        class="thread-list-menu py-0 px-1"
      >
        <v-list-item 
          v-for="thread in filteredThreads"
          :key="thread.id"
          color="indigo"
          slim
          subtitle="Insert last received message here."
          class="thread-item py-1 pr-2 pl-1 my-1"
          @click="sendBook(thread.id, thread.name)"
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
              <span>{{ getThreadDisplayName(thread) }}</span>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "ThreadSelector",

  data() {
    return {
      menu: false,
      searchQuery: '',
    }
  },

  computed: {
    ...mapGetters("threadStore", ["getThreadDisplayName"]),

    threads() {
      return this.$store.state.threadStore.threads;
    },

    filteredThreads() {
      if (!this.searchQuery) {
        return this.threads;
      }

      return this.threads.filter(thread => {
        const query = this.searchQuery.toLowerCase();

        return (
          this.getThreadDisplayName(thread).toLowerCase().includes(query)
        );
      });
    }
  },

  methods: {
    sendBook(threadId, threadName) {
      this.$emit('selected-book', { threadId, threadName })
      this.menu = false;
    }
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

.thread-list-menu {
  max-height: 216px;
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