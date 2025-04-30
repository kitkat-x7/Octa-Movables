import prisma from "../../../config/prisma_client"
import {  handlePrismaError } from "../../../middleware/errorhanddler";
import { vehicle_Model_Details } from "../../../util/types";
import { set_Vehiclemodel_cache } from "../../cache/vehicle_model";

export const post_model=async (data:vehicle_Model_Details)=>{
    try{
        const bookig_data=await prisma.vehicleModel.create({
            data:{
                modelname:data.modelname,
                vehicletypeid:data.vehicletypeid
            }
        });
        set_Vehiclemodel_cache({
            modelname:bookig_data.modelname,
            vehicletypeid:bookig_data.vehicletypeid
        },bookig_data.id,bookig_data.available);
        return bookig_data;
    }catch(err){
        handlePrismaError(err);
    }
}