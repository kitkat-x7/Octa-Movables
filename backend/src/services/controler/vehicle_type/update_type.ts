import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client"
import { Databaseerror } from "../../../middleware/errorhanddler";
import { vehicle_Type_Details } from "../../../util/types";

export const patch_type=async (id:number,data:vehicle_Type_Details)=>{
    try{
        const model=prisma.vehicleType.update({
            where:{
                id
            },
            data:{
                name:data.name,
                wheel:data.wheel
            }
        });
        return model;
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