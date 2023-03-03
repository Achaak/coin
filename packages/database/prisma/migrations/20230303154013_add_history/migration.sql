/*
  Warnings:

  - A unique constraint covering the columns `[userId,coinRefId]` on the table `CoinRefWishlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,coinId]` on the table `CoinWishlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,userContactId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "HistoryCoinPrice" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryCoinPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryCoinRefPrice" (
    "id" TEXT NOT NULL,
    "coinRefId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryCoinRefPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryUserCoinsPrice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryUserCoinsPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HistoryCoinPrice_coinId_idx" ON "HistoryCoinPrice"("coinId");

-- CreateIndex
CREATE INDEX "HistoryCoinRefPrice_coinRefId_idx" ON "HistoryCoinRefPrice"("coinRefId");

-- CreateIndex
CREATE INDEX "HistoryUserCoinsPrice_userId_idx" ON "HistoryUserCoinsPrice"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CoinRefWishlist_userId_coinRefId_key" ON "CoinRefWishlist"("userId", "coinRefId");

-- CreateIndex
CREATE UNIQUE INDEX "CoinWishlist_userId_coinId_key" ON "CoinWishlist"("userId", "coinId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_userContactId_key" ON "Contact"("userId", "userContactId");
