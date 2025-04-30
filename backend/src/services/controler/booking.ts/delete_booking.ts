import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client"
import { Databaseerror, handlePrismaError } from "../../../middleware/errorhanddler";

export const delete_bookings=async (id:number)=>{
    try{
        await prisma.booking.delete({
            where:{
                id
            }
        });
        delete_bookings(id);
        return;
    }catch(err){
        handlePrismaError(err);
    }   
}