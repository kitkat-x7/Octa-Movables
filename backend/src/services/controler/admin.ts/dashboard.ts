import { Prisma, wheel_type } from "@prisma/client";
import prisma from "../../../config/prisma_client";
import { Databaseerror } from "../../../middleware/errorhanddler";
import { Model_Metrics, Type_Metrics, Wheel_Metrics, Matrics } from "../../../util/types";
import { get_Metrics_cache, set_Metrics_cache } from "../../cache/dashboard";

export const Analytics = async (): Promise<Matrics> => {
try{
    let Data = await get_Metrics_cache();
    if (Data) return Data;
    const Model_data = await prisma.vehicleModel.findMany();
    const Type_data = await prisma.vehicleType.findMany();
    let Model_Count = new Map<string, number>();
    let Type_Count = new Map<string, number>();
    let Wheel_Count = new Map<wheel_type, number>();
    const TypeMap = new Map<number, { name: string; wheel: wheel_type }>();
    Type_data.forEach(type => {
      TypeMap.set(type.id, { name: type.name, wheel: type.wheel });
    });
    Model_data.forEach(model => {
      Model_Count.set(model.modelname, model.Rent_count);
      const typeInfo = TypeMap.get(model.vehicletypeid);
      if(typeInfo) {
        Type_Count.set(typeInfo.name, (Type_Count.get(typeInfo.name) || 0) + model.Rent_count);
        Wheel_Count.set(typeInfo.wheel, (Wheel_Count.get(typeInfo.wheel) || 0) + model.Rent_count);
      }
    });
    const modelMetrics: Model_Metrics[] = Array.from(Model_Count.entries()).map(([name, number]) => ({ name, number }));
    const typeMetrics: Type_Metrics[] = Array.from(Type_Count.entries()).map(([name, number]) => ({ name, number }));
    const wheelMetrics: Wheel_Metrics[] = Array.from(Wheel_Count.entries()).map(([name, number]) => ({ name, number }));
    const finalMetrics: Matrics = { model: modelMetrics, type: typeMetrics, wheel: wheelMetrics};
    set_Metrics_cache(finalMetrics);
    return finalMetrics;
}
catch(err){
    if(err instanceof Prisma.PrismaClientKnownRequestError){
        throw new Databaseerror(err.message,err,err.code);
    }else if(err instanceof Prisma.PrismaClientValidationError){
        throw new Databaseerror(err.message,err);
    }else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        throw new Databaseerror(err.message,err);
    }else if(err instanceof Prisma.PrismaClientRustPanicError){
        throw new Databaseerror(err.message,err);
    }else if(err instanceof Prisma.PrismaClientInitializationError){
        throw new Databaseerror(err.message,err);
    }
    else{
        throw new Databaseerror("Unknown Database Error",err);
    }
  }   
};
