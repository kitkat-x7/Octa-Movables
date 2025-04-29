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