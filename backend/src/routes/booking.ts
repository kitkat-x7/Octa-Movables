import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
import { booking_schema } from '../util/zod';
const router=express.Router();
router.use(express.json());


router.post('/',(req:Request,res:Response,next:NextFunction)=>{
    try{
        const data=booking_schema.parse(req.body);
        const {firstname,lastname,modelid,starttime,endtime}=data;
        res.status(200).json({
            message:"Booking Created"
        })
    }catch(err){

    }
});


router.get('/:bookingid',(req:Request,res:Response,next:NextFunction)=>{
    try{

    }catch(err){

    }
});



