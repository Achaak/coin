-- AlterTable
ALTER TABLE "UserCoin" ADD COLUMN     "currencyCode" TEXT NOT NULL DEFAULT 'USD';

-- CreateIndex
CREATE INDEX "UserCoin_currencyCode_idx" ON "UserCoin"("currencyCode");
