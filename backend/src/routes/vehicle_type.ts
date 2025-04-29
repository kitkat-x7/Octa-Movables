import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
import { get_type, get_type_by_wheel } from '../services/controler/vehicle_type/get_type';
import { wheel_type } from '../util/types';
import { Databaseerror, error_handler, Servererror } from '../middleware/errorhanddler';
import { type_schema } from '../util/zod';
import { post_type } from '../services/controler/vehicle_type/post_type';
import { patch_type } from '../services/controler/vehicle_type/update_type';
import { delete_type } from '../services/controler/vehicle_type/delete_type';
import { verifyuser } from '../middleware/adminauth';
const router=express.Router();
router.use(express.json());
router.use(error_handler);

router.get('/:typeid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const typeid=Number(req.params.typeid);
        const data=await get_type(typeid);
        res.status(200).json({
            message:"Vehicle Type Data Fetched",
            payload:data
        }); 
    }catch(err){
        if(err instanceof Databaseerror){
            return next(new Databaseerror(err.message,err,err.code));
        }else{
            console.error("Service layer error:",err);
            return next(new Servererror("Server Error",500,err));
        }
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
        if(err instanceof Databaseerror){
            return next(new Databaseerror(err.message,err,err.code));
        }else{
            console.error("Service layer error:",err);
            return next(new Servererror("Server Error",500,err));
        }
    }
});

router.use(verifyuser);
router.post('/',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const data=type_schema.parse(req.body);
        const {wheel,name}=data;
        const type=await post_type({
            wheel,
            name
        });        
        res.status(200).json({
            message:"Vehicle Type Data Added",
            payload:type
        });
    }catch(err){
        if(err instanceof Databaseerror){
            return next(new Databaseerror(err.message,err,err.code));
        }else if(err instanceof ZodError){
            return next(new Servererror(err.message,403,err));
        }else{
            console.error("Service layer error:",err);
            return next(new Servererror("Server Error",500,err));
        }
    }
});

router.patch('/:id',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const data=type_schema.parse(req.body);
        const {wheel,name}=data;
        const id=Number(req.params.id);
        const type=await patch_type(id,{
            wheel,
            name
        });        
        res.status(200).json({
            message:"Vehicle Type Data Added",
            payload:type
        });
    }catch(err){
        if(err instanceof Databaseerror){
            return next(new Databaseerror(err.message,err,err.code));
        }else if(err instanceof ZodError){
            return next(new Servererror(err.message,403,err));
        }else{
            console.error("Service layer error:",err);
            return next(new Servererror("Server Error",500,err));
        }
    }
});

router.delete('/:typeid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const typeid=Number(req.params.typeid);
        await delete_type(typeid);
        res.status(200).json({
            message:"Vehicle Type Data Deleted",
            payload:""
        }); 
    }catch(err){
        if(err instanceof Databaseerror){
            return next(new Databaseerror(err.message,err,err.code));
        }else{
            console.error("Service layer error:",err);
            return next(new Servererror("Server Error",500,err));
        }
    }
});