/*
  Warnings:

  - You are about to drop the column `edge` on the `CoinRef` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CoinAlignment" AS ENUM ('MEDAL', 'COIN', 'VARIOUS');

-- AlterTable
ALTER TABLE "Coin" ALTER COLUMN "year" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CoinRef" DROP COLUMN "edge",
ADD COLUMN     "alignment" "CoinAlignment",
ADD COLUMN     "edgeDescription" TEXT,
ADD COLUMN     "edgeType" TEXT,
ALTER COLUMN "denomination" DROP NOT NULL,
ALTER COLUMN "composition" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "diameter" DROP NOT NULL,
ALTER COLUMN "thickness" DROP NOT NULL,
ALTER COLUMN "shape" DROP NOT NULL,
ALTER COLUMN "obverseCreator" DROP NOT NULL,
ALTER COLUMN "obverseDescription" DROP NOT NULL,
ALTER COLUMN "reverseCreator" DROP NOT NULL,
ALTER COLUMN "reverseDescription" DROP NOT NULL;
