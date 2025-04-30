export interface Booking_Details{
  firstname:string,
  lastname:string,
  modelid:number,
  startdate:Date,
  enddate:Date 
}

export interface vehicle_Model_Details{
    modelname:string,
    vehicletypeid:number
}

export type wheel_type="TWO_WHEELER" | "FOUR_WHEELER";

export interface vehicle_Type_Details{
    wheel:wheel_type,
    name:string
}

export interface admin{
    email:string,
    password:string
}

export interface Model_Metrics{
    name:string,
    number:number
}

export interface Type_Metrics{
    name:string,
    number:number
}

export interface Wheel_Metrics{
    name:wheel_type,
    number:number
}

export interface Matrics{
    model:Model_Metrics[],
    type:Type_Metrics[],
    wheel:Wheel_Metrics[]
}