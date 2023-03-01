/*
  Warnings:

  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Wishlist";

-- CreateTable
CREATE TABLE "CoinWishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "CoinWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinRefWishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coinRefId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "CoinRefWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CoinWishlist_userId_idx" ON "CoinWishlist"("userId");

-- CreateIndex
CREATE INDEX "CoinWishlist_coinId_idx" ON "CoinWishlist"("coinId");

-- CreateIndex
CREATE INDEX "CoinRefWishlist_userId_idx" ON "CoinRefWishlist"("userId");

-- CreateIndex
CREATE INDEX "CoinRefWishlist_coinRefId_idx" ON "CoinRefWishlist"("coinRefId");
