import prisma from "../../../config/prisma_client"
import { handlePrismaError } from "../../../middleware/errorhanddler";
import { get_VehicleModel_cache, set_Vehiclemodel_cache } from "../../cache/vehicle_model";

export const get_model=async (id:number)=>{
    try{
        let data=await get_VehicleModel_cache(id);
        if(data){
            return data;
        }
        let Data=await prisma.vehicleModel.findUniqueOrThrow({
            where:{
                id
            }
        });
        set_Vehiclemodel_cache({
            modelname:Data.modelname,
            vehicletypeid:Data.vehicletypeid
        },id,Data.available);
        return data;
    }catch(err){
        handlePrismaError(err);
    }   
}

//
export const get_model_by_type=async (vehicletypeid:number)=>{
    try{
        const data=await prisma.vehicleModel.findMany({
            where:{
                vehicletypeid
            }
        });
        return data;
    }catch(err){
        handlePrismaError(err);
    }   
}