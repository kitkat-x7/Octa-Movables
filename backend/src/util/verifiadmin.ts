import jwt from 'jsonwebtoken';
import { Servererror } from '../middleware/errorhanddler';

export const verification=(token:string):number=>{
    const JWT_SECRET=process.env.JWT_SECRET;
    if(!token || !JWT_SECRET){
        throw new Servererror("Token or secret not found",400);
    }let id;
    id=jwt.verify(token,JWT_SECRET);
    if(!id){
        throw new Servererror("Unauthorised access",401);
    }else{
        return Number(id);
    }
}

