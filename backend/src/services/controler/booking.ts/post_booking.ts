import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client"
import { Databaseerror } from "../../../middleware/errorhanddler";

export const post_bookings=async (data:Booking_Details)=>{
    try{
        const bookig_data=prisma.booking.create({
            data:{
                firstname:data.firstname,
                lastname:data.lastname,
                modelid:data.modelid,
                startdate:data.startdate,
                enddate:data.lastname
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