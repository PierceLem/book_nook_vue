import store from "@/store";
import axios from "axios";

const messageSocketEventHandlers = {
  new_message: (data) => {
    store.commit('threadStore/ADD_MESSAGE', data)
  },
  active_users: (data) => {
    store.commit('threadStore/SET_ACTIVE_USERS', data)
  },
  update_bookmark: (data) => {
    store.commit("threadStore/UPDATE_BOOKMARK", data)
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

export function disconnectFromThread(socket) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  const threadId = store.state.threadStore.activeThread?.id;
  const lastReadMessageId = store.state.threadStore.lastReadMessageId;

  socket.onclose = () => {
    if (threadId && lastReadMessageId) {
      axios.put(`/threads/${threadId}/bookmark/`, {
        message_id: lastReadMessageId
      });
    }
  };

  socket.close();
}