import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http"; // Use IncomingMessage instead of Express Request
import { httpServer } from "./server";
import { Servererror } from "./middleware/errorhanddler";
import { verification } from "./util/verifiadmin";
import { Analytics } from "./services/controler/admin.ts/dashboard";

export const clients = new Set<WebSocket>();

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (socket: WebSocket, req: IncomingMessage) => {
  try {
    const token = req.headers['token'] as string | undefined;
    if (!token) throw new Servererror("No Token Found", 404);
    verification(token);
    clients.add(socket);
    Analytics().then((data) => {
      const payload = JSON.stringify(data);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(payload);
      }
    });

    socket.on("close", () => {
      clients.delete(socket);
    });

    socket.on("error", (err) => {
      console.error("WebSocket error:", err);
      clients.delete(socket);
    });
  } catch (err) {
    console.error("Connection error:", err);
    socket.close();
  }
});
