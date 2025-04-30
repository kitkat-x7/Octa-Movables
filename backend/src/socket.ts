import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http"; // Use IncomingMessage instead of Express Request
import { httpServer } from "./server";
import { Servererror } from "./middleware/errorhanddler";
import { verification } from "./util/verifiadmin";
import { Analytics } from "./services/controler/admin.ts/dashboard";

export const clients = new Set<WebSocket>();

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", async (socket: WebSocket, req: IncomingMessage) => {
  try {
    const token = req.headers['token'] as string | undefined;
    if (!token) throw new Servererror("No Token Found", 404);
    const adminid=verification(token);
    clients.add(socket);
    setInterval(async()=>{
        if(adminid){
            const data=await Analytics();
            const payload = JSON.stringify(data);
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(payload);
            }
        }
    },60000);
    socket.on("close", () => {
      clients.delete(socket);
    });
    socket.on("error", (err) => {
      console.error("WebSocket error:", err);
      socket.send(JSON.stringify({ error: "Failed to fetch analytics data." }));
    });
  }catch (err){
    console.error("Connection error:", err);
    socket.close();
  }
});
