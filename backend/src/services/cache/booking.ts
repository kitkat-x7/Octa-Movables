import NodeCache from "node-cache";
import { Booking_Details } from "../../util/types";
const myCache=new NodeCache();

export const set_booking_cache=(data:Booking_Details,id:number)=>{
    const key=`Booking${id}`;
    myCache.set(key,{
        firstname:data.firstname,
        lastname:data.lastname,
        modelid:data.modelid,
        startdate:data.startdate,
        enddate:data.enddate
    },100); 
};

export const get_booking_cache=async (id:number)=>{
    const key=`Booking${id}`;
    const value=await myCache.get(key) as Booking_Details;
    return value;
};

export const delete_booking_cache=(id:number)=>{
    const key=`Booking${id}`;
    myCache.del(key);
};