import express,{Request,Response,NextFunction} from 'express';
import z,{ZodError} from 'zod';
import { admin_schema } from '../../util/zod';
import { get_admin_details, signin, signup } from '../../services/controler/admin.ts/adminlogin';
import { Databaseerror, error_handler, Servererror } from '../../middleware/errorhanddler';
import { verifyuser } from '../../middleware/adminauth';
const router=express.Router();
router.use(express.json());
router.use(error_handler);

router.post('/signup',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const admin_data=admin_schema.parse(req.body);
        const {email,password}=admin_data;
        await signup({
            email,
            password
        });
        res.status(201).json({
            message:"Registered",
            payload:""
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


router.post('/signin',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const admin_data=admin_schema.parse(req.body);
        const {email,password}=admin_data;
        const token=await signin({
            email,
            password
        });
        res.status(201).json({
            message:"Signin",
            payload:token
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
router.get("/",async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const id=req.id;
        const admin=await get_admin_details(id);
        res.status(200).json(admin);
    }catch(err){
        if(err instanceof Databaseerror){
            return next(new Databaseerror(err.message,err,err.code));
        }else if(err instanceof Servererror){
            return next(new Servererror(err.message,err.status,err));
        }else{
            return next(new Servererror("Server Error",500,err));
        }
    }
});
