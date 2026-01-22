export function connectToThread(threadId, onMessage) {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(
    `${protocol}://${window.location.host}/ws/threads/${threadId}/`
  );

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  return socket;
}