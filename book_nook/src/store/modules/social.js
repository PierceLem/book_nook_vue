import axios from "axios"
import { connectUserSocket } from "@/sockets/userSocket"

export const getOtherUser = (friendship, currentUserId) => {
  return friendship.from_user.id === currentUserId
    ? friendship.to_user
    : friendship.from_user;
};

export const shapeRequest = (friendship, currentUserId) => ({
  id: friendship.id,
  other_user: getOtherUser(friendship, currentUserId),
  accepted: friendship.accepted,
  created_at: friendship.created_at,
  updated_at: friendship.updated_at,
});

export default {
  namespaced: true,

  state: () => ({
    friends: [],
    incomingRequests: [],
    outgoingRequests: [],
    socket: null,
  }),

  mutations: {
    SET_SOCKET(state, socket) {
      state.socket = socket
    },
    SET_FRIENDS(state, friends) {
      state.friends = friends
    },
    SET_INCOMING_REQUESTS(state, incoming_requests) {
      state.incomingRequests = incoming_requests
    },
    SET_OUTGOING_REQUESTS(state, outgoing_requests) {
      state.outgoingRequests = outgoing_requests
    },
    ADD_FRIEND(state, friend) {
      state.friends.push(friend)
    },
    REMOVE_FRIEND(state, friendId) {
      state.friends = state.friends
        .filter(f => f.id !== friendId)
    },
    ADD_INCOMING_REQUEST(state, request) {
      state.incomingRequests.push(request)
    },
    REMOVE_INCOMING_REQUEST(state, userId) {
      state.incomingRequests = state.incomingRequests
        .filter(r => r.id !== userId)
    },
    ADD_OUTGOING_REQUEST(state, request) {
      state.outgoingRequests.push(request)
    },
    REMOVE_OUTGOING_REQUEST(state, requestId) {
      state.outgoingRequests = state.outgoingRequests
        .filter(r => r.id !== requestId)
    },
  },

  actions: {
    setSocket({ commit }, userId) {
      const socket = connectUserSocket(userId)
      commit("SET_SOCKET", socket)
    },

    async fetchFriends({ commit, rootState }) {
      try {
        const response = await axios.get("/my-friends/")
        const currentUserId = rootState.auth.user.id

        commit("SET_FRIENDS", response.data.friends.map(f => shapeRequest(f, currentUserId)))
        commit("SET_INCOMING_REQUESTS", response.data.incoming_requests.map(f => shapeRequest(f, currentUserId)))
        commit("SET_OUTGOING_REQUESTS", response.data.outgoing_requests.map(f => shapeRequest(f, currentUserId)))
      } catch(error) {
        dispatch('ui/showSnackbar', {
          subject: 'Failed to load friends',
          icon: 'mdi-close',
          color: 'red',
        }, { root: true })
      }
    },

    async searchUsers(_, query) {
      try {
        const response = await axios.get("/search-users/", {
          params: { q: query }
        })

        return response.data.users

      } catch (error) {
        console.error("Error searching users:", error)
        return []
      }
    },

    async sendFriendRequest({ dispatch, commit, rootState }, userIds) {
      try {
        const response = await axios.post('/friend-request/', userIds)
        const currentUserId = rootState.auth.user.id
        const shaped = shapeRequest(response.data, currentUserId)

        commit("ADD_OUTGOING_REQUEST", shaped)
        dispatch('ui/showSnackbar', 
          {
            subject: 'Friend Request Sent',
            content: 'You sent a request to ' + shaped.other_user.username,
            icon: 'mdi-check',
            color: 'green',
          }, { root: true }
        )
      } catch(error) {
        dispatch('ui/showSnackbar',
          {
            subject: 'Friend Request Failed',
            content: error.response.data.__all__[0],
            icon: 'mdi-close',
            color: 'red',
          }, { root: true }
        )
      }
    },

    async cancelFriendRequest({ dispatch, commit }, { requestId, username }) {
      try {
        await axios.delete('/friend-request/', {
          data: { id: requestId }
        })
        commit("REMOVE_OUTGOING_REQUEST", requestId)
        dispatch('ui/showSnackbar', 
          {
            subject: 'Friend Request Cancelled',
            content: 'You cancelled your request to ' + username,
            icon: 'mdi-check',
            color: 'green',
          }, { root: true }
        )
      } catch(error) {
        dispatch('ui/showSnackbar', 
          {
            subject: 'Cancellation Failed',
            icon: 'mdi-close',
            color: 'red',
          }, { root: true }
        )
      }
    },

    async declineFriendRequest({ dispatch, commit }, { requestId, username }) {
      try {
        await axios.delete('/friend-request/', {
          data: { id: requestId }
        })
        commit("REMOVE_INCOMING_REQUEST", requestId)
        dispatch('ui/showSnackbar', 
          {
            subject: 'Friend Request Declined',
            content: 'You declined the request from ' + username,
            icon: 'mdi-check',
            color: 'green',
          }, { root: true }
        )
      } catch(error) {
        dispatch('ui/showSnackbar', 
          {
            subject: 'Failed to Decline Request',
            icon: 'mdi-close',
            color: 'red',
          }, { root: true }
        )
      }
    },

    async acceptFriendRequest({ dispatch, commit, rootState }, { requestId, username}) {
      try {
        commit("notificationStore/REMOVE_FRIENDSHIP_NOTIFICATION", requestId, { root: true })

        const response = await axios.put('/friend-request/', {"id": requestId})
        const currentUserId = rootState.auth.user.id
        const shaped = shapeRequest(response.data, currentUserId)

        commit("REMOVE_INCOMING_REQUEST", requestId)
        commit("ADD_FRIEND", shaped)

        dispatch('ui/showSnackbar', 
          {
            subject: 'Friend Request Accepted',
            content: 'You accepted the request from ' + username,
            icon: 'mdi-check',
            color: 'green',
          }, { root: true }
        )
      } catch(error) {
        dispatch('ui/showSnackbar', 
          {
            subject: 'Failed to Accept Request',
            icon: 'mdi-close',
            color: 'red',
          }, { root: true }
        )
      }
    },

    async unfriend({ dispatch, commit }, { friendshipId, username}) {
      try {
        await axios.delete('/friend-request/', {
          data: { id: friendshipId }
        })
        commit("REMOVE_FRIEND", friendshipId)
        dispatch('ui/showSnackbar', 
          {
            subject: 'Unfriend',
            content: 'You unfriended ' + username,
            icon: 'mdi-check',
            color: 'green',
          }, { root: true }
        )
      } catch(error) {
        dispatch('ui/showSnackbar', 
          {
            subject: 'Failed to Unfriend',
            icon: 'mdi-close',
            color: 'red',
          }, { root: true }
        )
      }
    },
  }
}