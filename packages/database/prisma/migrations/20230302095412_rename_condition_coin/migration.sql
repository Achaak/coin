/*
  Warnings:

  - Changed the type of `condition` on the `UserCoin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CoinCondition" AS ENUM ('G', 'VG', 'F', 'VF', 'XF', 'UNC', 'BU', 'PRF');

-- AlterTable
ALTER TABLE "UserCoin" DROP COLUMN "condition",
ADD COLUMN     "condition" "CoinCondition" NOT NULL;

-- DropEnum
DROP TYPE "ConditionCoin";
