-- CreateEnum
CREATE TYPE "wheel_type" AS ENUM ('TWO_WHEELER', 'FOUR_WHEELER');

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" SERIAL NOT NULL,
    "wheel" "wheel_type" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicletypeid" INTEGER NOT NULL,

    CONSTRAINT "VehicleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "modelid" INTEGER NOT NULL,
    "startdate" TIMESTAMP(3) NOT NULL,
    "enddate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_name_vehicletypeid_key" ON "VehicleModel"("name", "vehicletypeid");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_modelid_startdate_enddate_key" ON "Booking"("modelid", "startdate", "enddate");

-- AddForeignKey
ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_vehicletypeid_fkey" FOREIGN KEY ("vehicletypeid") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_modelid_fkey" FOREIGN KEY ("modelid") REFERENCES "VehicleModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
