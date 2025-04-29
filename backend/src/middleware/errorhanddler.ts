import { Request,Response,NextFunction } from "express";

const map: Record<string, number> = {
    P1000: 401,
    P1001: 503,
    P1002: 504,
    P1003: 500,
    P1008: 504,
    P1009: 409,
    P1010: 403,
    P2000: 400,
    P2001: 404,
    P2002: 409,
    P2003: 409,
    P2004: 400,
    P2005: 400,
    P2006: 400,
    P2007: 400,
    P2009: 400,
    P2010: 400,
    P2011: 400,
    P2012: 400,
    P2014: 409,
    P2015: 404,
    P2025: 404,
    P3002: 409,
    P4001: 409,
    P4002: 409,
};

export class Servererror extends Error {
    status:number;
    err?:Error|unknown;
    constructor(message:string,status:number,err?:Error|unknown){
        super(message);
        this.message=message;
        this.status=status;
        this.err=err;
    }
}

export class Databaseerror extends Error {
    code?:string;
    err:Error|unknown;
    constructor(message:string,err:Error|unknown,code?:string){
        super(message);
        this.message=message;
        this.code=code;
        this.err=err
    }
}

export const error_handler=(err:Error | Servererror | Databaseerror,req:Request,res:Response,next:NextFunction)=>{
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
    let status;
    if(err instanceof Servererror){
        status=err.status;
    }
    else if(err instanceof Databaseerror){
        if(err.code){
            status=map[err.code];
        }else{
            status=500
        }
    }
    else{
        status=500;
    }
    if(status>=400 && status<500){
        res.status(status).json({
            message:err.message,
        });
    }
    else{
        res.status(status).json({
            message:"Server Side Error",
        });
    }
}