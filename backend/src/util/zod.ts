import z, { string } from 'zod';



export const booking_schema=z.object({
    firstname:z.string({
        message:"Firstname must be a string."
    })
    .min(1,{
        message:"Firstname must not be empty."
    })
    .max(150,{
        message:"Firstname should be atmost 150 characters long."
    }),
    lastname:z.string({
        message:"Lastname must be a string."
    })
    .min(1,{
        message:"Lastname must not be empty."
    })
    .max(150,{
        message:"Lastname should be atmost 150 characters long."
    }),
    modelid:z.number({
        message:"modelid must be a number"
    }),
    starttime: z.coerce.date(),
    endtime: z.coerce.date()
}).refine(data=>data.endtime>data.starttime,({
    message:"End time must be after start time",
    path:["endtime"]
})).refine(data=>{
    const now=new Date();
    const istNow=new Date(now.getTime()+(5.5*60*60*1000)); //Current IST Time
    return data.starttime>=istNow;
},{
    message: "Start time cannot be in the past (IST time)",
    path: ["starttime"]
});


export const model_schema=z.object({
    modelname:z.string({
        message:"Model Name has to be a string"
    }),
    vehicletypeid:z.number({
        message:"vehicle type id has to be a number"
    })
});

export const type_schema=z.object({
    wheel:z.enum(["TWO_WHEELER","FOUR_WHEELER"],{
        message:"Please specify a valid wheel type"
    }),
    name:z.string({
        message:"vehicle type has to be a string"
    }),
});

export const admin_schema=z.object({
    email:z.string({ message: "Email must be a string" })
        .min(11,{ message: "Email must be at least 11 char longs" })
        .max(200,{ message: "Email must be at atmost 100 char longs" })
        .email({ message: "Must be an email." }),
    password:z.string({ message: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
        .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
        message: "Password must contain at least one uppercase letter, one number, and one special character."
    })
});