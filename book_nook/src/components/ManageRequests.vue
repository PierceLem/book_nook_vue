<template>
  <v-tabs
    v-model="requestsTabs"
    align-tabs="center"
    density="comfortable"
    color="indigo"
  >
    <v-tab width="150px" :value="'a'">Sent</v-tab>
    <v-tab width="150px" :value="'b'">
      Received
      <v-badge
        v-if="receivedRequests.length"
        :content="receivedRequests.length"
        inline
        color="error"
      >
      </v-badge>
    </v-tab>
  </v-tabs>

  <v-tabs-window v-model="requestsTabs">
    <v-tabs-window-item
      :value="'a'"
      class="px-1"
    >
      <v-list
        v-if="sentRequests.length > 0"
        density="compact"
        base-color="indigo"
        nav
        class="request-list pt-0 pb-1 px-1"
      >
        <v-list-item 
          v-for="req in sentRequests"
          color="indigo"
          height="48px"
          :prepend-avatar=req.other_user.avatar
          :subtitle=req.other_user.email
          class="thread-item pl-2 pr-0 py-0 my-1"
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
                :owner="req.other_user"
                :isFriend="true"
              />

              <span>{{ req.other_user.username }}</span>
            </v-btn>
          </template>
          <template v-slot:append>
            <v-btn 
              icon
              height="25px"
              width="25px"
              color="indigo"
              variant="text"
              class="mr-2"
              @click="deleteRequest(req.id, req.other_user.username)"
            >
              <v-icon size="x-small">mdi-undo-variant</v-icon>
              <v-tooltip activator="parent" location="bottom" open-delay="500">
                Unsend Request
              </v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <div v-if="sentRequests.length == 0" class="request-list-placeholder"><span class="text-indigo">No Data</span></div>
    </v-tabs-window-item>

    <v-tabs-window-item
      :value="'b'"
      class="px-1"
    >
      <v-list
        v-if="receivedRequests.length > 0"
        density="compact"
        base-color="indigo"
        nav
        class="request-list pt-0 pb-1 px-1"
      >
        <v-list-item
          v-for="req in receivedRequests"
          color="indigo"
          height="48px"
          :prepend-avatar="req.other_user.avatar"
          :subtitle="req.other_user.email"
          class="thread-item pl-2 pr-0 py-0 my-1"
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
                :owner="req.other_user"
                :isFriend="true"
              />

              <span>{{ req.other_user.username }}</span>
            </v-btn>
          </template>

          <template v-slot:append>
            <div class="d-flex flex-column align-center">
              <v-btn
                variant="text"
                color="green"
                height="24px"
                size="x-small"
                tile
                class="pr-1"
                @click="acceptRequest(req.id)"
              >
                <v-icon class="pr-2">mdi-check</v-icon>
                <v-tooltip activator="parent" location="bottom" open-delay="500">
                  Accept
                </v-tooltip>
              </v-btn>

              <v-btn
                variant="text"
                color="red"
                height="24px"
                size="x-small"
                tile
                class="pr-1"
                @click="declineRequest(req.id)"
              >
                <v-icon class="pr-2">mdi-close</v-icon>
                <v-tooltip activator="parent" location="bottom" open-delay="500">
                  Decline
                </v-tooltip>
              </v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>

      <div v-if="receivedRequests.length == 0" class="request-list-placeholder"><span class="text-indigo">No Data</span></div>
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script>
import axios from 'axios';
import UserInfoCard from './UserInfoCard.vue';

export default {
  name: "ManageRequests",

  data() {
    return {
      requestsTabs: 'a',
    }
  },

  components: {
    UserInfoCard,
  },

  props: {
    sentRequests: {
      type: Array,
      default: () => [],
    },
    receivedRequests: {
      type: Array,
      default: () => [],
    },
  },

  inject: ['showSnackbar'],

  emits: ["accept-request"],

  methods: {
    async deleteRequest(id, username) {
      try {
        await axios.delete('/friend-request/', 
          {data: {id: id}}
        )
        const index = this.sentRequests.findIndex(req => req.id === id);
        if (index !== -1) {
          this.sentRequests.splice(index, 1);
        }
        this.showSnackbar({
          subject: 'Cancelled friend request with ' + username,
          content: 'You can view friend request data in the profile page',
          icon: 'mdi-check',
          color: 'green',
        })
      } catch {
      }
    },

    acceptRequest(id) {
      const action = "accept"
      this.handleRequest(id, action);
    },

    declineRequest(id) {
      const action = "decline"
      this.handleRequest(id, action);
    },

    async handleRequest(id, action) {
      try {
        const response = await axios.put('/friend-request/', 
          { id: id, action: action }
        );
        console.log(response.data);
        if (action == 'accept') {
          this.$emit('accept-request', response.data.friendship);
          this.showSnackbar({
            subject: 'You are now friends with ' + response.data.friendship.other_user.username,
            content: 'You can view friend request data in the profile page',
            icon: 'mdi-check',
            color: 'green',
          })
        } else {
          this.showSnackbar({
            subject: "Friend request from " + response.data.user + " declined",
            content: 'You can view friend request data in the profile page',
            icon: 'mdi-check',
            color: 'green',
          })
        }
        const index = this.receivedRequests.findIndex(req => req.id === id);
        if (index !== -1) {
          this.receivedRequests.splice(index, 1);
        }
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style>
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