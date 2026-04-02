import store from "@/store";

export function connectToThread(threadId, onMessage) {
  const token = localStorage.getItem('token');

  const socket = new WebSocket(
    `ws://localhost:8000/ws/threads/${threadId}/?token=${token}`
  );

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const payload = JSON.parse(event.data);

    if (payload.thread) {
      store.commit("threadStore/UPDATE_THREAD", payload.thread);
    }

    if (payload.message) {
      store.commit("threadStore/ADD_MESSAGE", payload.message);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  return socket;
}