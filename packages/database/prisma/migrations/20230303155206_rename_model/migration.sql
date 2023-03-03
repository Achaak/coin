/*
  Warnings:

  - You are about to drop the `HistoryCoinPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoryCoinRefPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoryUserCoinsPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HistoryCoinPrice";

-- DropTable
DROP TABLE "HistoryCoinRefPrice";

-- DropTable
DROP TABLE "HistoryUserCoinsPrice";

-- CreateTable
CREATE TABLE "CoinPriceHistory" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinRefPriceHistory" (
    "id" TEXT NOT NULL,
    "coinRefId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinRefPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCoinsPriceHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCoinsPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CoinPriceHistory_coinId_idx" ON "CoinPriceHistory"("coinId");

-- CreateIndex
CREATE INDEX "CoinRefPriceHistory_coinRefId_idx" ON "CoinRefPriceHistory"("coinRefId");

-- CreateIndex
CREATE INDEX "UserCoinsPriceHistory_userId_idx" ON "UserCoinsPriceHistory"("userId");
