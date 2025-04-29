import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
import { booking_schema } from '../util/zod';
import { post_bookings } from '../services/controler/booking.ts/post_booking';
import { get_bookings } from '../services/controler/booking.ts/get_booking';
import { Databaseerror, error_handler, Servererror } from '../middleware/errorhanddler';
import { verifyuser } from '../middleware/adminauth';
const router=express.Router();
router.use(express.json());
router.use(error_handler);

router.post('/',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const data=booking_schema.parse(req.body);
        const {firstname,lastname,modelid,starttime,endtime}=data;
        const bookig_data=await post_bookings({
            firstname,
            lastname,
            modelid,
            startdate:starttime,
            enddate:endtime
        });
        res.status(200).json({
            message:"Booking Created",
            payload:bookig_data
        });
    }
    catch(err){
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

router.use(verifyuser);
router.get('/:bookingid',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const id=Number(req.params.bookingid);
        const data=await get_bookings(id);
        res.status(200).json({
            message:"Booking Data Fetched",
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



