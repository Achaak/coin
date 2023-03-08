/*
  Warnings:

  - You are about to drop the column `denomination` on the `CoinRef` table. All the data in the column will be lost.
  - Added the required column `currency` to the `Catalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `CoinRef` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueShort` to the `CoinRef` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "currency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Coin" ADD COLUMN     "mintLocation" TEXT,
ADD COLUMN     "mintMark" TEXT;

-- AlterTable
ALTER TABLE "CoinRef" DROP COLUMN "denomination",
ADD COLUMN     "demonetized" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "edgeImage" TEXT,
ADD COLUMN     "value" TEXT NOT NULL,
ADD COLUMN     "valueShort" TEXT NOT NULL;
