import prisma from "../../../config/prisma_client"
import { handlePrismaError } from "../../../middleware/errorhanddler";
import { vehicle_Type_Details } from "../../../util/types";
import { set_VehicleType_cache } from "../../cache/vehicle_type";

export const post_type=async (data:vehicle_Type_Details)=>{
    try{
        const bookig_data=await prisma.vehicleType.create({
            data:{
                name:data.name,
                wheel:data.wheel
            }
        });
        set_VehicleType_cache({
            name:data.name,wheel:data.wheel
        },bookig_data.id);
        return bookig_data;
    }catch(err){
        handlePrismaError(err);
    }
}