/*
  Warnings:

  - You are about to drop the column `catalogId` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `mark` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `mark` on the `CoinRef` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Coin_catalogId_idx";

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "catalogId",
DROP COLUMN "mark";

-- AlterTable
ALTER TABLE "CoinRef" DROP COLUMN "mark",
ADD COLUMN     "catalogId" TEXT;

-- CreateIndex
CREATE INDEX "CoinRef_catalogId_idx" ON "CoinRef"("catalogId");
