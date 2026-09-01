<template>
  <v-text-field 
    v-model="searchQuery"
    label="Search Users" 
    variant="outlined" 
    density="compact" 
    color="indigo"
    base-color="indigo"
    hide-details 
    prepend-inner-icon="mdi-magnify" 
    rounded="lg"
    class="px-1 pt-1 mt-2"
  ></v-text-field>

  <v-list
    v-if="users.length > 0"
    density="compact"
    base-color="indigo"
    nav
    class="thread-list pt-0 pb-1 px-1"
  >
    <v-list-item 
      v-for="user in users"
      color="indigo"
      height="48px"
      :prepend-avatar="user.avatar"
      :subtitle="user.email"
      class="thread-item py-2 px-2 my-1"
    >
      <template v-slot:title>
        <v-btn 
          variant="text" 
          color="indigo" 
          density="compact"
          size="small"
          slim
          class="text-none"
        >
          <UserInfoCard
            :owner="user"
            :isFriend="true"
          />

          <span>{{ user.username }}</span>
        </v-btn>
      </template>

      <template v-slot:append>
        <v-btn 
          icon
          height="25px"
          width="25px"
          color="indigo"
          variant="text"
          class="mr-1"
          @click="sendFriendRequest(user.id)"
        >
          <v-icon size="x-small">mdi-account-plus-outline</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-list>

  <div v-if="users.length == 0 && searchQuery" class="users-list-placeholder"><span class="text-indigo">No Data</span></div>

  <div v-if="users.length == 0 && !searchQuery" class="users-list-placeholder"><span class="text-indigo">User Search</span></div>
</template>

<script>
import { mapState } from 'vuex';
import _ from "lodash";
import UserInfoCard from '@/apps/main/components/UserInfoCard.vue';

export default {
  name: "SearchUsers",

  components: {
    UserInfoCard,
  },

  data() {
    return {
      searchQuery: '',
      users: [],
    }
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  watch: {
    searchQuery: {
      handler: _.debounce(async function (newQuery) {

        if (!newQuery) {
          this.users = []
          return
        }

        this.users = await this.$store.dispatch("social/searchUsers", newQuery)

      }, 400)
    }
  },

  methods: {
    sendFriendRequest(userId) {
      this.$store.dispatch("social/sendFriendRequest", {"from_user_id": this.$store.state.auth.user.id, "to_user_id": userId})
    }
  }
}
</script>

<style>
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

.users-list-placeholder {
  height: calc(100vh - 188px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.thread-list {
  height: calc(100vh - 188px);
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