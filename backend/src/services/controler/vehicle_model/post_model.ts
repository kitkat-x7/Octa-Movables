import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client"
import { Databaseerror } from "../../../middleware/errorhanddler";
import { vehicle_Model_Details } from "../../../util/types";

export const post_model=async (data:vehicle_Model_Details)=>{
    try{
        const bookig_data=prisma.vehicleModel.create({
            data:{
                modelname:data.modelname,
                vehicletypeid:data.vehicletypeid
            }
        });
        return bookig_data;
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