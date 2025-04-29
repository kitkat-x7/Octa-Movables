import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
const router=express.Router();
router.use(express.json());

router.get('/:modelid',(req:Request,res:Response,next:NextFunction)=>{
    try{
        
    }catch(err){

    }
});

//Admin Priviledges
router.post('/',(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {modelname,vehicletypeid}=req.body
    }catch(err){

    }
});

router.patch('/',(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {modelname,vehicletypeid}=req.body
    }catch(err){

    }
});

router.delete('/:modelid',(req:Request,res:Response,next:NextFunction)=>{
    try{
        
    }catch(err){

    }
});