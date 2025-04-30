import prisma from "../../../config/prisma_client"
import {  handlePrismaError } from "../../../middleware/errorhanddler";
import { vehicle_Type_Details } from "../../../util/types";
import { set_VehicleType_cache } from "../../cache/vehicle_type";

export const patch_type=async (id:number,data:vehicle_Type_Details)=>{
    try{
        const model=await prisma.vehicleType.update({
            where:{
                id
            },
            data:{
                name:data.name,
                wheel:data.wheel
            }
        });
        set_VehicleType_cache({
            name:data.name,wheel:data.wheel
        },model.id);
        return model;
    }catch(err){
        handlePrismaError(err);
    }
}