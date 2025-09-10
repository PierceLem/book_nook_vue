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
      <v-tab width="100px" :value="3">Requests</v-tab>
    </v-tabs>

    <v-tabs-window v-model="friendsTabs">
      <v-tabs-window-item
        :value="1"
        class="px-1"
      >
        <ManageFriends 
          :friends="friends"
          @delete-friendship="removeFriend"
        />
      </v-tabs-window-item>

      <v-tabs-window-item
        :value="2"
        class="px-1"
      >
        <SearchUsers
          @friend-request-sent="addNewRequest"
        />
      </v-tabs-window-item>

      <v-tabs-window-item
        :value="3"
      >
        <ManageRequests
          :sent-requests="sentRequests"
          :received-requests="receivedRequests"
          @accept-request="addFriend"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script>
import axios from 'axios';
import ManageFriends from './ManageFriends.vue';
import SearchUsers from './SearchUsers.vue';
import ManageRequests from './ManageRequests.vue';

export default {
  name: 'FriendsManager',

  components: {
    ManageFriends,
    SearchUsers,
    ManageRequests,
  },

  data() {
    return {
      friendsTabs: 1,
      friends: [],
      sentRequests: [],
      receivedRequests: [],
    }
  },

  mounted() {
    this.fetchFriends();
  },

  methods: {
    async fetchFriends() {
      try {
        const response = await axios.get('/my-friends/');
        console.log(response.data);
        this.friends = response.data.friends;
        this.sentRequests = response.data.sent_requests;
        this.receivedRequests = response.data.received_requests;
      } catch {
        console.error()
      }
    },

    addNewRequest(newRequest) {
      this.sentRequests.push(newRequest);
    },

    addFriend(friend) {
      this.friends.push(friend);
    },

    removeFriend(id) {
      const index = this.friends.findIndex(friend => friend.id === id);
      if (index !== -1) {
        this.friends.splice(index, 1);
      }
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

.friends-list-placeholder {
  height: calc(100vh - 136px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.request-list {
  height: calc(100vh - 180px);
  background-color: #E8EAF6;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(63, 81, 181, 0.5) transparent;
}

.request-list-placeholder {
  height: calc(100vh - 180px);
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