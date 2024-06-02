/*
  Warnings:

  - You are about to drop the column `customersId` on the `addreess` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `addreess` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addreess" DROP CONSTRAINT "addreess_customersId_fkey";

-- AlterTable
ALTER TABLE "addreess" DROP COLUMN "customersId";
ALTER TABLE "addreess" ALTER COLUMN "customer_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "addressId" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addreess_customer_id_key" ON "addreess"("customer_id");

-- AddForeignKey
ALTER TABLE "addreess" ADD CONSTRAINT "addreess_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
