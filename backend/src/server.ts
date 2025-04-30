import express from 'express';
import http from 'http';
import dotenv from 'dotenv'; 
dotenv.config(); 
const app=express();
const Port=process.env.Port;

export const httpServer=http.createServer(app);

httpServer.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});


