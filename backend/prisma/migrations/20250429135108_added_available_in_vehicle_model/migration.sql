/*
  Warnings:

  - You are about to drop the column `available` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "available";

-- AlterTable
ALTER TABLE "VehicleModel" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;
