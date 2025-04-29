import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
const router=express.Router();
router.use(express.json());


router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    try{
        //Get dashboard statistics
    }catch(err){
        
    }
});
