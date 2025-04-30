import {Request,Response,NextFunction} from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import dotenv from 'dotenv'; 
import { Servererror } from "./errorhanddler";
dotenv.config(); 

export {}
declare global {
    namespace Express {
      export interface Request {
        id:any
      }
    }
}

let token_data;
export const verifyuser=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.header('token');
    const JWT_SECRET=process.env.JWT_SECRET;
    if(!token || !JWT_SECRET){
        next(new Servererror("Token or secret not found",400));
        return;
    }
    jwt.verify(token,JWT_SECRET,(err,data)=>{
        if(err){
            if(err instanceof JsonWebTokenError){
                next(new Servererror(err.message,401,err));
                return;
            }else{
                next(new Servererror("Unauthorised access",401,err));
                return;
            }
        }else{
            req.id=data;
            return next();
        }
    });
}
export {token_data};