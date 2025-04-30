
import prisma from "../../../config/prisma_client"
import {  handlePrismaError } from "../../../middleware/errorhanddler";
import { wheel_type } from "../../../util/types";
import { get_VehicleType_cache, set_VehicleType_cache } from "../../cache/vehicle_type";

export const get_type=async (id:number)=>{
    try{
        let data=await get_VehicleType_cache(id);
        if(data){
            return data;
        }
        let Data=await prisma.vehicleType.findUniqueOrThrow({
            where:{
                id
            }
        });
        set_VehicleType_cache({
            name:Data.name,wheel:Data.wheel
        },id);
    }catch(err){
        handlePrismaError(err);
    }   
}

export const get_type_by_wheel=async (wheel:wheel_type)=>{
    try{
        const data=await prisma.vehicleType.findMany({
            where:{
                wheel
            }
        });
        return data;
    }catch(err){
        handlePrismaError(err);
    }   
}