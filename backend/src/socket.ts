import {WebSocket,WebSocketServer} from "ws";
import { Request } from "express"; 
import { httpServer } from "./server";
import { Servererror } from "./middleware/errorhanddler";
import { verification } from "./util/verifiadmin";

export const clients = new Set();
const wss=new WebSocketServer({
    server:httpServer
});

wss.on('connection',(socket:WebSocket,req:Request)=>{
    const token=req.header('token');
    if(token==undefined || !token){
        throw new Servererror("No Token Found",404);
    }
    verification(token);
    clients.add(socket);
    Analytics();
});

