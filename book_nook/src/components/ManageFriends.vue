<template>
  <template v-if="friends.length > 0">
    <v-text-field 
      v-model="searchQuery"
      label="Search Friends" 
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
      density="compact"
      base-color="indigo"
      nav
      class="thread-list pt-0 pb-1 px-1"
    >
      <v-list-item 
        v-for="friend in filteredFriends"
        color="indigo"
        height="48px"
        :prepend-avatar='friend.other_user.avatar'
        :subtitle="friend.other_user.email"
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
              :owner="friend.other_user"
              :isFriend="true"
            />

            <span>{{ friend.other_user.username }}</span>
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
          >
            <v-icon size="x-small">mdi-account-minus-outline</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </template>

  <div v-if="friends.length == 0" class="friends-list-placeholder"><span class="text-indigo">No Data</span></div>
</template>

<script>
import UserInfoCard from './UserInfoCard.vue';

export default {
  name: "ManageFriends",

  components: {
    UserInfoCard,
  },

  props: {
    friends: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      searchQuery: '',
    }
  },

  computed: {
    filteredFriends() {
      if (!this.searchQuery) return this.friends;

      const q = this.searchQuery.toLowerCase();
      return this.friends.filter(friend => {
        const { username, email } = friend.other_user;
        return (
          username.toLowerCase().includes(q) ||
          email.toLowerCase().includes(q)
        )
      })
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

.thread-list {
  height: calc(100vh - 188px);
  background-color: #E8EAF6;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.friends-list-placeholder {
  height: calc(100vh - 136px);
  display: flex;
  justify-content: center;
  align-items: center;
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