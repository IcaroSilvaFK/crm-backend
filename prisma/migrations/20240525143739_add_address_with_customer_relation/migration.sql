/*
  Warnings:

  - Added the required column `customer_id` to the `addreess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customersId` to the `addreess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addreess" ADD COLUMN     "customer_id" STRING NOT NULL;
ALTER TABLE "addreess" ADD COLUMN     "customersId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "username" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "addreess" ADD CONSTRAINT "addreess_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
