import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client";
import { Databaseerror, handlePrismaError, Servererror } from "../../../middleware/errorhanddler";
import { admin } from "../../../util/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
dotenv.config();

export const signup=async (data:admin)=>{
    try{
        const admin=await get_admin_details(data.email);
        if(admin){
            throw new Servererror(`User with ${data.email} already exists.`,409);
        }
        const password_hassed=await bcrypt.hash(data.password,10);
        await post_admin_details({
            email:data.email,
            password:password_hassed
        });
        return;
    }catch(err){
        handlePrismaError(err);
    }
};

export const signin=async (data:admin)=>{
    try{
        const user=await get_admin_details(data.email);
        if(!user){
            throw new Servererror(`User with ${data.email} doesn't exist.`,404);
        }
        const password=await bcrypt.compare(data.password,user.password);
        if(password){
            const JWT_SECRET=process.env.JWT_SECRET as string;
            const token=jwt.sign({id:user.id},JWT_SECRET,{
                expiresIn:"24h"
            });
            return token;
        }else{
            throw new Servererror(`Invalid Password.`,403);
        }
    }catch(err){
        handlePrismaError(err);
    }
};




export const get_admin_details=async (data:string | number)=>{
    try{
        if(typeof(data)==='string'){
            const admin=await prisma.admin.findUniqueOrThrow({
                where:{
                    email:data
                }
            });
            return admin;
        }else{
            const admim=await prisma.admin.findUniqueOrThrow({
                where:{
                    id:data
                }
            });
            return admim;
        }
    }catch(err){
        handlePrismaError(err);
    }
}

export const post_admin_details=async (data:admin)=>{
    try{
        const admin=await prisma.admin.create({
            data:{
                email:data.email,
                password:data.password
            }
        });
        return admin;
    }catch(err){
        handlePrismaError(err);
    }
}

