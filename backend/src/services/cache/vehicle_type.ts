import NodeCache from "node-cache";
import { vehicle_Type_Details } from "../../util/types";
const myCache=new NodeCache();

export const set_VehicleType_cache=(data:vehicle_Type_Details,id:number)=>{
    const key=`Type${id}`;
    myCache.set(key,{
        wheel:data.wheel,
        name:data.name
    },100); 
};

export const get_VehicleType_cache=async (id:number)=>{
    const key=`Type${id}`;
    const value=await myCache.get(key) as vehicle_Type_Details;
    return value;
};

export const delete_VehicleType_cache=async (id:number)=>{
    const key=`Type${id}`;
    myCache.del(key);
};