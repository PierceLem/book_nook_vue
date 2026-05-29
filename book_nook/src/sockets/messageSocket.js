import store from "@/store";

const messageSocketEventHandlers = {
  new_message: (data) => {
    store.commit('threadStore/ADD_MESSAGE', data)
  },
  active_users: (data) => {
    store.commit('threadStore/SET_ACTIVE_USERS', data)
  },
}

export function connectToThread(threadId, onMessage) {
  const token = localStorage.getItem('token');

  const socket = new WebSocket(
    `ws://localhost:8000/ws/threads/${threadId}/?token=${token}`
  );

  socket.onmessage = (event) => {
    const { event: eventType, data } = JSON.parse(event.data)
    const handler = messageSocketEventHandlers[eventType]

    if (handler) {
      handler(data)
    } else {
      console.warn(`Unhandled socket event: ${eventType}`)
    }
  };

  return socket;
}