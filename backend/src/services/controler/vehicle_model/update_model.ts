import prisma from "../../../config/prisma_client"
import { handlePrismaError } from "../../../middleware/errorhanddler";
import { vehicle_Model_Details } from "../../../util/types";
import { set_Vehiclemodel_cache } from "../../cache/vehicle_model";

export const patch_model=async (id:number,data:vehicle_Model_Details)=>{
    try{
        const model=await prisma.vehicleModel.update({
            where:{
                id
            },
            data:{
                modelname:data.modelname,
                vehicletypeid:data.vehicletypeid
            }
        });
        set_Vehiclemodel_cache({
            modelname:model.modelname,
            vehicletypeid:model.vehicletypeid
        },model.id,model.available);
        return model;
    }catch(err){
        handlePrismaError(err);
    }
}