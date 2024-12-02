/*
  Warnings:

  - The values [UTILITY] on the enum `TransactionCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionCategory_new" AS ENUM ('CREDIT_CARD', 'INTERNET', 'ENTERTAINMENT', 'ENERGY_BILL', 'FIES', 'FOOD_CARD', 'HEALTH', 'PHONE_BILL', 'HOUSING', 'OTHER', 'SALARY', 'STORE_CARDS', 'TRANSPORTATION', 'UBER');
ALTER TABLE "Transaction" ALTER COLUMN "category" TYPE "TransactionCategory_new" USING ("category"::text::"TransactionCategory_new");
ALTER TYPE "TransactionCategory" RENAME TO "TransactionCategory_old";
ALTER TYPE "TransactionCategory_new" RENAME TO "TransactionCategory";
DROP TYPE "TransactionCategory_old";
COMMIT;
