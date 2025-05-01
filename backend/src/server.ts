// server.ts
import cors from 'cors';
import express from "express";
import http from "http";
import dotenv from "dotenv";
import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { Analytics } from "./services/controler/admin.ts/dashboard"; // Adjust the path if needed
import { verification } from "./util/verifiadmin";
import { Servererror } from "./middleware/errorhanddler";
import url from "url";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.Port || 3000;
app.use(cors({ origin: 'http://localhost:3000' }));
const httpServer = http.createServer(app);

// Route imports
import Admin from "./routes/admin/admin_auth";
import Booking from "./routes/booking";
import Type from "./routes/vehicle_type";
import Model from "./routes/vehicle_model";

// Use routes
app.use("/api/v1/admin", Admin);
app.use("/api/v1/booking", Booking);
app.use("/api/v1/type", Type);
app.use("/api/v1/model", Model);

app.get("/api/v2/user/home", (_req, res) => {
  res.json("Welcome");
});

const wss = new WebSocketServer({ server: httpServer });
const clients = new Set<WebSocket>();

wss.on("connection", async (socket: WebSocket, req: IncomingMessage) => {
  try {

    const query = url.parse(req.url || "", true).query;
    const token = query.token as string | undefined;
    if (!token) throw new Servererror("No Token Found", 404);
    const adminid = verification(token);
    clients.add(socket);

    const interval = setInterval(async () => {
      try {
        if (adminid && socket.readyState === WebSocket.OPEN) {
          const data = await Analytics();
          socket.send(JSON.stringify(data));
        }
      } catch (err) {
        console.error("Analytics send error:", err);
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ error: "Failed to fetch analytics data." }));
        }
      }
    }, 1000);

    socket.on("close", () => {
      clients.delete(socket);
      clearInterval(interval);
    });

    socket.on("error", (err) => {
      console.error("WebSocket error:", err);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ error: "WebSocket internal error." }));
      }
    });

  } catch (err) {
    console.error("Connection error:", err);
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ error: "Unauthorized WebSocket connection." }));
      socket.close();
    }
  }
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
