import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
const router=express.Router();
router.use(express.json());


router.post('/signup',(req:Request,res:Response,next:NextFunction)=>{
    try{
        //signup for admin
    }catch(err){

    }
});


router.post('/signin',(req:Request,res:Response,next:NextFunction)=>{
    try{
        //signin for admin
    }catch(err){

    }
});



