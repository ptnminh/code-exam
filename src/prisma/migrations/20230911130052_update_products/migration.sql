/*
  Warnings:

  - Changed the type of `created_date` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "created_date",
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL;
