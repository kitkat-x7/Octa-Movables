import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
import { get_model } from '../services/controler/vehicle_model/get_model';
import { model_schema } from '../util/zod';
import { post_model } from '../services/controler/vehicle_model/post_model';
import { patch_model } from '../services/controler/vehicle_model/update_model';
import { delete_model } from '../services/controler/vehicle_model/delete_model';
const router=express.Router();
router.use(express.json());

router.get('/:modelid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const modelid=Number(req.params.modelid);
        const data=await get_model(modelid);
        res.status(200).json({
            message:"Model Data Fetched",
            payload:data
        }); 
    }catch(err){

    }
});

//Admin Priviledges
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

    }
});

router.delete('/:modelid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const modelid=Number(req.params.modelid);
        const data=await delete_model(modelid);
        res.status(200).json({
            message:"Model Data Deleted",
            payload:data
        }); 
    }catch(err){

    }
});