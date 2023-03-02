/*
  Warnings:

  - You are about to drop the column `updated_at` on the `CoinRefWishlist` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `CoinWishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoinRefWishlist" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "CoinWishlist" DROP COLUMN "updated_at";

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userContactId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_userId_idx" ON "Contact"("userId");

-- CreateIndex
CREATE INDEX "Contact_userContactId_idx" ON "Contact"("userContactId");
