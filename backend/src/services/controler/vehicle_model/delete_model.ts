import prisma from "../../../config/prisma_client"
import { handlePrismaError } from "../../../middleware/errorhanddler";
import { delete_VehicleModel_cache } from "../../cache/vehicle_model";

export const delete_model=async (id:number)=>{
    try{
        await prisma.vehicleModel.delete({
            where:{
                id
            }
        });
        delete_VehicleModel_cache(id);
        return;
    }catch(err){
        handlePrismaError(err);
    }   
}