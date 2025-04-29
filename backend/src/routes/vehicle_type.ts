import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
import { get_type, get_type_by_wheel } from '../services/controler/vehicle_type/get_type';
import { wheel_type } from '../util/types';
const router=express.Router();
router.use(express.json());

router.get('/:typeid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const typeid=Number(req.params.typeid);
        const data=await get_type(typeid);
        res.status(200).json({
            message:"Vehicle Type Data Fetched",
            payload:data
        }); 
    }catch(err){

    }
});

router.get('/:wheel',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const wheel=req.params.wheel as wheel_type;
        const data=await get_type_by_wheel(wheel);
        res.status(200).json({
            message:"Vehicle Types based on wheel Fetched",
            payload:data
        }); 
    }catch(err){

    }
});

//Admin Priviledges
router.post('/',(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {wheeltype,name}=req.body
    }catch(err){

    }
});

router.patch('/',(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {wheeltype,name}=req.body
    }catch(err){

    }
});

router.delete('/:typeid',(req:Request,res:Response,next:NextFunction)=>{
    try{

    }catch(err){

    }
});