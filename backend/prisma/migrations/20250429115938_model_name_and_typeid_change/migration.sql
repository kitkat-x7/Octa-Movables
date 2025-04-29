/*
  Warnings:

  - You are about to drop the column `name` on the `VehicleModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[modelname,vehicletypeid]` on the table `VehicleModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modelname` to the `VehicleModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VehicleModel_name_vehicletypeid_key";

-- AlterTable
ALTER TABLE "VehicleModel" DROP COLUMN "name",
ADD COLUMN     "modelname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_modelname_vehicletypeid_key" ON "VehicleModel"("modelname", "vehicletypeid");
