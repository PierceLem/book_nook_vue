import store from "@/store";
import { shapeRequest } from "@/store/modules/social";

const getCurrentUserId = () => store.state.auth.user.id;

const socketEventHandlers = {
  /*Friendship related updates*/ 
  incoming_request: (data) => {
    const shaped = shapeRequest(data, getCurrentUserId())
    store.commit('social/ADD_INCOMING_REQUEST', shaped)
  },
  request_accepted: (data) => {
    const shaped = shapeRequest(data, getCurrentUserId())
    store.commit('social/REMOVE_OUTGOING_REQUEST', data.id)
    store.commit('social/ADD_FRIEND', shaped)
  },
  request_declined: (data) => {
    store.commit('social/REMOVE_OUTGOING_REQUEST', data)
  },
  friend_removed: (data) => {
    store.commit('social/REMOVE_FRIEND', data)
  },
  request_cancelled: (data) => {
    store.commit('social/REMOVE_INCOMING_REQUEST', data)
  },

  /*Thread related updates*/ 
  remove_thread: (data) => {
    store.commit('threadStore/REMOVE_THREAD', data)
  },
  add_thread: (data) => {
    store.commit('threadStore/ADD_THREAD', data)
  },
  update_thread: (data) => {
    store.commit("threadStore/UPDATE_THREAD", data)
  },

  /*Notification related updates*/ 
  new_notification: (data) => {
    store.commit("notificationStore/ADD_NOTIFICATION", data)
  }
}

export function connectUserSocket() {
  const token = localStorage.getItem("token");
  const socket = new WebSocket(`ws://localhost:8000/ws/user/?token=${token}`);

  socket.onmessage = (event) => {
    const { event: eventType, data } = JSON.parse(event.data)
    const handler = socketEventHandlers[eventType]

    if (handler) {
      handler(data)
    } else {
      console.warn(`Unhandled socket event: ${eventType}`)
    }
  };

  return socket;
}