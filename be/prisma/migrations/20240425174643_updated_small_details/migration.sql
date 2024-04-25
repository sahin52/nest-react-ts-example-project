/*
  Warnings:

  - You are about to drop the column `content` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "content",
ADD COLUMN     "description" TEXT;
