import prisma from "../../../config/prisma_client"
import {handlePrismaError } from "../../../middleware/errorhanddler";
import { delete_VehicleType_cache } from "../../cache/vehicle_type";

export const delete_type=async (id:number)=>{
    try{
        await prisma.vehicleType.delete({
            where:{
                id
            }
        })
        delete_VehicleType_cache(id);
        return;
    }catch(err){
        handlePrismaError(err);
    }   
}