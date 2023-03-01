/*
  Warnings:

  - Made the column `denomination` on table `CoinRef` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoinRef" ALTER COLUMN "denomination" SET NOT NULL;
