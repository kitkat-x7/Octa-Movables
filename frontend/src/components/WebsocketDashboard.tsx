import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WS_URL = "ws://localhost:5000"; // Adjust as needed

export default function WebSocketDashboard() {
  const { lastMessage, readyState } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
  });
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (lastMessage) setMessages(msgs => [...msgs, lastMessage.data]);
  }, [lastMessage]);

  return (
    <div>
      <h3>WebSocket Dashboard</h3>
      <div>Status: {["Connecting", "Open", "Closing", "Closed", "Uninstantiated"][readyState]}</div>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  );
}
