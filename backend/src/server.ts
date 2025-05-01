import express from 'express';
import http from 'http';
import dotenv from 'dotenv'; 
dotenv.config(); 
const app=express();
const Port=process.env.Port;
import cors from 'cors';
export const httpServer=http.createServer(app);
app.use(cors({ origin: 'http://localhost:3000' }));
import Admin from "./routes/admin/admin_auth";
import Booking from "./routes/booking";
import Type from "./routes/vehicle_type";
import Model from "./routes/vehicle_model";


app.use("/api/v1/admin",Admin);
app.use("/api/v1/booking",Booking);
app.use("/api/v1/type",Type);
app.use("/api/v1/model",Model);

app.get("/api/v2/user/home",(req,res)=>{
    res.json("Welcome");
});


httpServer.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});


