interface Booking_Details{
  firstname:string,
  lastname:string,
  modelid:number,
  startdate:Date,
  enddate:Date
}

interface vehicle_Model_Details{
    modelname:string,
    vehicletypeid:number
}

type wheel_type="TWO_WHEELER" | "FOUR_WHEELER";

interface vehicle_Type_Details{
    wheel:wheel_type,
    name:string
}