<template>
  <div class="d-flex flex-column mx-4 mt-3 mb-4 bg-indigo-lighten-5 rounded-xl" color="indigo" style="min-width: 300px; overflow: hidden;">
    <v-tabs
      v-model="friendsTabs"
      align-tabs="center"
      density="comfortable"
      bg-color="indigo"
      color="white"
    >
      <v-tab width="100px" :value="1">Friends</v-tab>
      <v-tab width="100px" :value="2">Search</v-tab>
      <v-tab width="100px" :value="3">
        <v-badge
          dot
          color="error"
          offset-y="-4"
          offset-x="78"
        >
          <span>Requests</span>
        </v-badge>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="friendsTabs">
      <v-tabs-window-item
        :key="1"
        :value="1"
        class="px-1"
      >
        <v-text-field 
          v-model="searchFriends"
          label="Search Friends" 
          variant="outlined" 
          density="compact" 
          color="indigo"
          base-color="indigo"
          hide-details 
          prepend-inner-icon="mdi-magnify" 
          rounded="lg"
          class="px-1 pt-1 mt-2"
          @click:prepend-inner="$emit('query', searchFriends)"
        ></v-text-field>

        <v-list
          density="compact"
          base-color="indigo"
          nav
          class="thread-list pt-0 pb-1 px-1"
        >
          <v-list-item 
            v-for="n in 12"
            :key="n"
            color="indigo"
            height="48px"
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Username"
            subtitle="Email@example.com"
            class="thread-item py-2 px-2 my-1"
          >
            <template v-slot:append>
              <v-btn 
                icon
                height="25px"
                width="25px"
                color="indigo"
                variant="text"
                class="mr-1"
              >
                <v-icon size="x-small">mdi-account-minus-outline</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-tabs-window-item>

      <v-tabs-window-item
        :key="2"
        :value="2"
        class="px-1"
      >
        <v-text-field 
          v-model="searchUsers"
          label="Search Users" 
          variant="outlined" 
          density="compact" 
          color="indigo"
          base-color="indigo"
          hide-details 
          prepend-inner-icon="mdi-magnify" 
          rounded="lg"
          class="px-1 pt-1 mt-2"
          @click:prepend-inner="$emit('query', searchUsers)"
        ></v-text-field>

        <v-list
          density="compact"
          base-color="indigo"
          nav
          class="thread-list pt-0 pb-1 px-1"
        >
          <v-list-item 
            v-for="n in 6"
            :key="n"
            color="indigo"
            height="48px"
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Username"
            subtitle="Email@example.com"
            class="thread-item py-2 px-2 my-1"
          >
            <template v-slot:append>
              <v-btn 
                icon
                height="25px"
                width="25px"
                color="indigo"
                variant="text"
                class="mr-1"
              >
                <v-icon size="x-small">mdi-account-plus-outline</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-tabs-window-item>

      <v-tabs-window-item
        :key="3"
        :value="3"
      >
        <v-tabs
          v-model="requestsTabs"
          align-tabs="center"
          density="comfortable"
          color="indigo"
        >
          <v-tab width="150px" :value="a">Sent</v-tab>
          <v-tab width="150px" :value="b">
            <v-badge
              content="3"
              inline
              color="error"
            >
              <span class="mr-1">Received</span>
            </v-badge>
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="requestsTabs">
          <v-tabs-window-item
            :key="a"
            :value="a"
            class="px-1"
          >
            <v-list
              density="compact"
              base-color="indigo"
              nav
              class="request-list pt-0 pb-1 px-1"
            >
              <v-list-item 
                v-for="n in 3"
                :key="n"
                color="indigo"
                height="48px"
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                title="Username"
                subtitle="Email@example.com"
                class="thread-item pl-2 pr-0 py-0 my-1"
              >
                <template v-slot:append>
                  <v-btn 
                    icon
                    height="25px"
                    width="25px"
                    color="indigo"
                    variant="text"
                    class="mr-2"
                  >
                    <v-icon size="x-small">mdi-undo-variant</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-tabs-window-item>

          <v-tabs-window-item
            :key="b"
            :value="b"
            class="px-1"
          >
            <v-list
              density="compact"
              base-color="indigo"
              nav
              class="request-list pt-0 pb-1 px-1"
            >
              <template v-for="n in 3" :key="n">
                <v-hover v-slot="{ isHovering, props }">
                  <v-list-item
                    v-bind="props"
                    color="indigo"
                    height="48px"
                    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                    title="Username"
                    subtitle="Email@example.com"
                    class="thread-item pl-2 pr-0 py-0 my-1"
                  >
                    <v-overlay 
                      :model-value="isHovering"
                      contained
                      class="d-flex flex-row align-center justify-center"
                      scrim="false"
                    >
                      <v-btn 
                        tile 
                        rounded="lg" 
                        size="30px" 
                        variant="flat" 
                        icon="mdi-check-underline" 
                        color="green" 
                        class="mr-2" 
                        @click=""
                      />
                      <v-btn 
                        tile 
                        rounded="lg" 
                        size="30px" 
                        variant="flat" 
                        icon="mdi-delete-variant" 
                        color="red" 
                        @click=""
                      />
                    </v-overlay>
                  </v-list-item>
                </v-hover>
              </template>
            </v-list>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script>
export default {
  name: 'FriendsManager',

  data() {
    return {
      friendsTabs: 1,
      requestsTabs: 'a',
    }
  }
};
</script>

<style scoped>
:deep(.v-field) {
  --v-field-padding-start: 7px;
}

:deep(.v-field--prepended) {
  padding-inline-start: 8px;
}

:deep(.v-field-label) {
  color: #3F51B5;
}

:deep(.v-field__input) {
  color: #3F51B5;
}

:deep(.v-icon.mdi-magnify) {
  color: #3F51B5;
}

.thread-list {
  height: calc(100vh - 188px);
  background-color: #E8EAF6;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.request-list {
  height: calc(100vh - 180px);
  background-color: #E8EAF6;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.thread-item {
  transition: background-color 0.3s ease;
  overflow: hidden;
  border-radius: 24px;
}

.thread-item:hover {
  background-color: white;
}
</style>