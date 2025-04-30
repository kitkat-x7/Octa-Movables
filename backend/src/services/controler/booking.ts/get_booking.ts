import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client"
import { Databaseerror, handlePrismaError } from "../../../middleware/errorhanddler";
import { get_booking_cache, set_booking_cache } from "../../cache/booking";

export const get_bookings=async (id:number)=>{
    try{
        let data=await get_booking_cache(id);
        if(data){
            return data;
        }
        const Data=await prisma.booking.findUniqueOrThrow({
            where:{
                id
            }
        });
        set_booking_cache({
            firstname:Data.firstname,
            lastname:Data.lastname,
            modelid:Data.modelid,
            startdate:Data.startdate,
            enddate:Data.enddate
        },id);
        return Data;
    }catch(err){
        handlePrismaError(err);
    }   
}