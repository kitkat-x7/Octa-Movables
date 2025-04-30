import { Prisma } from "@prisma/client";
import prisma from "../../../config/prisma_client"
import { Databaseerror, handlePrismaError, Servererror } from "../../../middleware/errorhanddler";
import { Booking_Details } from "../../../util/types";
import { set_booking_cache } from "../../cache/booking";
import { get_VehicleModel_cache, set_Vehiclemodel_cache } from "../../cache/vehicle_model";

export const post_bookings=async (data:Booking_Details)=>{
    try{
        const booking_available=await prisma.vehicleModel.findFirstOrThrow({
            where:{
                id:data.modelid
            },select:{
                available:true,
                modelname:true
            }
        });
        if(booking_available.available==false){
            throw new Servererror(`${booking_available.modelname} is not available for booking`,404);
        }
        await prisma.vehicleModel.update({
            where:{
                id:data.modelid
            },
            data:{
                available:false
            }
        });
        let Data1=await get_VehicleModel_cache(data.modelid);
        if(!Data1){
            Data1=await prisma.vehicleModel.findUniqueOrThrow({
                where:{
                    id:data.modelid
                }
            });
        }
        set_Vehiclemodel_cache({
            modelname:Data1.modelname,
            vehicletypeid:Data1.vehicletypeid,
        },data.modelid,false);
        const bookig_data=await prisma.booking.create({
            data:{
                firstname:data.firstname,
                lastname:data.lastname,
                modelid:data.modelid,
                startdate:data.startdate,
                enddate:data.enddate
            }
        });
        set_booking_cache({
            firstname:data.firstname,
            lastname:data.lastname,
            modelid:data.modelid,
            startdate:data.startdate,
            enddate:data.enddate
        },bookig_data.id);
        return bookig_data;
    }catch(err){
        handlePrismaError(err);
    }
}