import NodeCache from "node-cache";
import { vehicle_Model_Details } from "../../util/types";
const myCache=new NodeCache();

export const set_Vehiclemodel_cache=(data:vehicle_Model_Details,id:number,available:boolean)=>{
    const key=`Model${id}`;
    myCache.set(key,{
        modelname:data.modelname,
        vehicletypeid:data.vehicletypeid,
        available
    },100); 
};

export const get_VehicleModel_cache=async (id:number)=>{
    const key=`Model${id}`;
    const value=await myCache.get(key) as vehicle_Model_Details;
    return value;
};

export const delete_VehicleModel_cache=(id:number)=>{
    const key=`Model${id}`;
    myCache.del(key);
};