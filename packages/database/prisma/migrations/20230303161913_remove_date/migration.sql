/*
  Warnings:

  - You are about to drop the column `date` on the `CoinPriceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `CoinRefPriceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `UserCoinsPriceHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoinPriceHistory" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "CoinRefPriceHistory" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "UserCoinsPriceHistory" DROP COLUMN "date";
