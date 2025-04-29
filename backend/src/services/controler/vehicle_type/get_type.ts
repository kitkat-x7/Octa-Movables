import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client"
import { Databaseerror } from "../../../middleware/errorhanddler";

export const get_type=async (id:number)=>{
    try{
        const data=prisma.vehicleType.findUniqueOrThrow({
            where:{
                id
            }
        })
        return data;
    }catch(err){
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            throw new Databaseerror(err.message,err,err.code);
        }else if(err instanceof Prisma.PrismaClientValidationError){
            throw new Databaseerror(err.message,err);
        }else if(err instanceof Prisma.PrismaClientUnknownRequestError){
            throw new Databaseerror(err.message,err);
        }else if(err instanceof Prisma.PrismaClientRustPanicError){
            throw new Databaseerror(err.message,err);
        }else if(err instanceof Prisma.PrismaClientInitializationError){
            throw new Databaseerror(err.message,err);
        }
        else{
            throw new Databaseerror("Unknown Database Error",err);
        }
    }   
}