/*
  Warnings:

  - The values [PENDING,SHIPPED,DELIVERED] on the enum `orderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,CUSTOMER] on the enum `userRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "orderStatus_new" AS ENUM ('pending', 'shipped', 'delivered');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "orderStatus_new" USING ("status"::text::"orderStatus_new");
ALTER TYPE "orderStatus" RENAME TO "orderStatus_old";
ALTER TYPE "orderStatus_new" RENAME TO "orderStatus";
DROP TYPE "orderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "userRole_new" AS ENUM ('admin', 'customer');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "userRole_new" USING ("role"::text::"userRole_new");
ALTER TYPE "userRole" RENAME TO "userRole_old";
ALTER TYPE "userRole_new" RENAME TO "userRole";
DROP TYPE "userRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'pending';
