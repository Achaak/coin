/*
  Warnings:

  - Changed the type of `type` on the `CoinRef` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `catalogId` on table `CoinRef` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CoinType" AS ENUM ('CIRCULATION', 'COLLECTOR', 'COMMEMORATIVE');

-- AlterTable
ALTER TABLE "CoinRef" DROP COLUMN "type",
ADD COLUMN     "type" "CoinType" NOT NULL,
ALTER COLUMN "catalogId" SET NOT NULL;

-- DropEnum
DROP TYPE "TypeCoin";
