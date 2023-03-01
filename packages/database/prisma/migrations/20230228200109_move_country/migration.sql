/*
  Warnings:

  - You are about to drop the column `countryCode` on the `CoinRef` table. All the data in the column will be lost.
  - Added the required column `countryCode` to the `Catalog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CoinRef_countryCode_idx";

-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "countryCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CoinRef" DROP COLUMN "countryCode";

-- CreateIndex
CREATE INDEX "Catalog_countryCode_idx" ON "Catalog"("countryCode");
