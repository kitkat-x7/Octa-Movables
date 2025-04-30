import prisma from "../config/prisma_client"
import { set_Vehiclemodel_cache } from "../services/cache/vehicle_model";

export const timer=(timer:number,modelid:number)=>{
    setTimeout(async ()=>{
        const data=await prisma.vehicleModel.update({
            where:{
                id:modelid,
            },
            data:{
                available:true
            }
        });
        set_Vehiclemodel_cache({
            modelname:data.modelname,
            vehicletypeid:data.vehicletypeid
        },data.id,true);
    },timer);
}