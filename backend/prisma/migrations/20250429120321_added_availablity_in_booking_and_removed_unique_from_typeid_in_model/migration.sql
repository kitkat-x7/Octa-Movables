/*
  Warnings:

  - A unique constraint covering the columns `[modelname]` on the table `VehicleModel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VehicleModel_modelname_vehicletypeid_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_modelname_key" ON "VehicleModel"("modelname");
