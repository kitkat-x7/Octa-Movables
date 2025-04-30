import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
import { get_model } from '../services/controler/vehicle_model/get_model';
import { model_schema } from '../util/zod';
import { post_model } from '../services/controler/vehicle_model/post_model';
import { patch_model } from '../services/controler/vehicle_model/update_model';
import { delete_model } from '../services/controler/vehicle_model/delete_model';
import { Databaseerror, error_handler, Servererror } from '../middleware/errorhanddler';
import { verifyuser } from '../middleware/adminauth';
const router=express.Router();
router.use(express.json());
router.use(error_handler);

router.get('/:modelid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const modelid=Number(req.params.modelid);
        const data=await get_model(modelid);
        res.status(200).json({
            message:"Model Data Fetched",
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
        const data=model_schema.parse(req.body);
        const {modelname,vehicletypeid}=data;
        const model=await post_model({
            modelname,
            vehicletypeid
        });
        res.status(200).json({
            message:"Model Data Added",
            payload:model
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
        const data=model_schema.parse(req.body);
        const id=Number(req.params.id);
        const {modelname,vehicletypeid}=data;
        const model=await patch_model(id,{
            modelname,
            vehicletypeid
        });
        res.status(200).json({
            message:"Model Data Updated",
            payload:model
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

router.delete('/:modelid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const modelid=Number(req.params.modelid);
        await delete_model(modelid);
        res.status(200).json({
            message:"Model Data Deleted",
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

export default router;