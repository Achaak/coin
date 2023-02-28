-- CreateEnum
CREATE TYPE "ConditionCoin" AS ENUM ('G', 'VG', 'F', 'VF', 'XF', 'UNC', 'BU', 'PRF');

-- CreateEnum
CREATE TYPE "TypeCoin" AS ENUM ('CIRCULATION', 'COLLECTOR', 'COMMEMORATIVE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Country" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CoinRef" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "type" "TypeCoin" NOT NULL,
    "denomination" TEXT NOT NULL,
    "mark" TEXT,
    "composition" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "edge" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "obverseCreator" TEXT NOT NULL,
    "obverseDescription" TEXT NOT NULL,
    "observeImage" TEXT,
    "reverseCreator" TEXT NOT NULL,
    "reverseDescription" TEXT NOT NULL,
    "reverseImage" TEXT,

    CONSTRAINT "CoinRef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "refId" TEXT NOT NULL,
    "catalogId" TEXT,
    "mark" TEXT,
    "mintageQtyUNC" INTEGER,
    "mintageQtyBU" INTEGER,
    "mintageQtyPRF" INTEGER,
    "observeImage" TEXT,
    "reverseImage" TEXT,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCoin" (
    "id" TEXT NOT NULL,
    "condition" "ConditionCoin" NOT NULL,
    "comment" TEXT,
    "price" DOUBLE PRECISION,
    "exchangeable" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "observeImage" TEXT,
    "reverseImage" TEXT,

    CONSTRAINT "UserCoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userWishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "CoinRef_countryCode_idx" ON "CoinRef"("countryCode");

-- CreateIndex
CREATE INDEX "Coin_refId_idx" ON "Coin"("refId");

-- CreateIndex
CREATE INDEX "Coin_catalogId_idx" ON "Coin"("catalogId");

-- CreateIndex
CREATE INDEX "Catalog_name_idx" ON "Catalog"("name");

-- CreateIndex
CREATE INDEX "UserCoin_userId_idx" ON "UserCoin"("userId");

-- CreateIndex
CREATE INDEX "UserCoin_coinId_idx" ON "UserCoin"("coinId");

-- CreateIndex
CREATE INDEX "Message_fromId_idx" ON "Message"("fromId");

-- CreateIndex
CREATE INDEX "Message_toId_idx" ON "Message"("toId");

-- CreateIndex
CREATE UNIQUE INDEX "_userWishlist_AB_unique" ON "_userWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_userWishlist_B_index" ON "_userWishlist"("B");
