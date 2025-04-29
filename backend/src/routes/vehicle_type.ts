import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
const router=express.Router();
router.use(express.json());

router.get('/:typeid',(req:Request,res:Response,next:NextFunction)=>{
    try{
        
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