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
        v-if="incomingRequests.length"
        :content="incomingRequests.length"
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
        v-if="outgoingRequests.length > 0"
        density="compact"
        base-color="indigo"
        nav
        class="request-list pt-0 pb-1 px-1"
      >
        <v-list-item 
          v-for="req in outgoingRequests"
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
              @click="cancelRequest(req.id, req.other_user.username)"
            >
              <v-icon size="x-small">mdi-undo-variant</v-icon>
              <v-tooltip activator="parent" location="bottom" open-delay="500">
                Unsend Request
              </v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <div v-if="outgoingRequests.length == 0" class="request-list-placeholder"><span class="text-indigo">No Data</span></div>
    </v-tabs-window-item>

    <v-tabs-window-item
      :value="'b'"
      class="px-1"
    >
      <v-list
        v-if="incomingRequests.length > 0"
        density="compact"
        base-color="indigo"
        nav
        class="request-list pt-0 pb-1 px-1"
      >
        <v-list-item
          v-for="req in incomingRequests"
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
                @click="acceptRequest(req.id, req.other_user.username)"
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
                @click="declineRequest(req.id, req.other_user.username)"
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

      <div v-if="incomingRequests.length == 0" class="request-list-placeholder"><span class="text-indigo">No Data</span></div>
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script>
import { mapState } from 'vuex';
import UserInfoCard from '@/apps/main/components/UserInfoCard.vue';

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

  computed: {
    ...mapState('social', [
      'incomingRequests',
      'outgoingRequests'
    ]),
  },

  methods: {
    declineRequest(id, username) {
      this.$store.dispatch("social/declineFriendRequest", {"requestId": id, "username": username})
    },

    acceptRequest(id, username) {
      this.$store.dispatch("social/acceptFriendRequest", {"requestId": id, "username": username})
    },

    cancelRequest(id, username) {
      this.$store.dispatch("social/cancelFriendRequest", {"requestId": id, "username": username})
    }
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