-- CreateEnum
CREATE TYPE "CoinCondition" AS ENUM ('G', 'VG', 'F', 'VF', 'XF', 'UNC', 'BU', 'PRF');

-- CreateEnum
CREATE TYPE "CoinType" AS ENUM ('CIRCULATION', 'COLLECTOR', 'COMMEMORATIVE');

-- CreateEnum
CREATE TYPE "CoinAlignment" AS ENUM ('MEDAL', 'COIN', 'VARIOUS');

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
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearStart" INTEGER NOT NULL,
    "yearEnd" INTEGER,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinRef" (
    "id" TEXT NOT NULL,
    "type" "CoinType" NOT NULL,
    "value" TEXT NOT NULL,
    "valueShort" TEXT NOT NULL,
    "composition" TEXT,
    "weight" DOUBLE PRECISION,
    "diameter" DOUBLE PRECISION,
    "thickness" DOUBLE PRECISION,
    "shape" TEXT,
    "alignment" "CoinAlignment",
    "demonetized" BOOLEAN NOT NULL DEFAULT false,
    "edgeType" TEXT,
    "edgeDescription" TEXT,
    "edgeImage" TEXT,
    "obverseCreator" TEXT,
    "obverseDescription" TEXT,
    "observeImage" TEXT,
    "reverseCreator" TEXT,
    "reverseDescription" TEXT,
    "reverseImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "catalogId" TEXT NOT NULL,

    CONSTRAINT "CoinRef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "yearStart" INTEGER NOT NULL,
    "yearEnd" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Mint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "year" INTEGER,
    "mintMark" TEXT,
    "mintId" TEXT,
    "refId" TEXT NOT NULL,
    "mintageQtyUNC" INTEGER,
    "mintageQtyBU" INTEGER,
    "mintageQtyPRF" INTEGER,
    "observeImage" TEXT,
    "reverseImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCoin" (
    "id" TEXT NOT NULL,
    "condition" "CoinCondition" NOT NULL,
    "comment" TEXT,
    "price" DOUBLE PRECISION,
    "currencyCode" TEXT NOT NULL DEFAULT 'USD',
    "exchangeable" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "observeImage" TEXT,
    "reverseImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinWishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinRefWishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coinRefId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinRefWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userContactId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinPriceHistory" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinRefPriceHistory" (
    "id" TEXT NOT NULL,
    "coinRefId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinRefPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCoinsPriceHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCoinsPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "code" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("code")
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
CREATE INDEX "Catalog_name_idx" ON "Catalog"("name");

-- CreateIndex
CREATE INDEX "Catalog_periodId_idx" ON "Catalog"("periodId");

-- CreateIndex
CREATE INDEX "CoinRef_catalogId_idx" ON "CoinRef"("catalogId");

-- CreateIndex
CREATE INDEX "Mint_name_idx" ON "Mint"("name");

-- CreateIndex
CREATE INDEX "Mint_location_idx" ON "Mint"("location");

-- CreateIndex
CREATE INDEX "Coin_refId_idx" ON "Coin"("refId");

-- CreateIndex
CREATE INDEX "Coin_mintId_idx" ON "Coin"("mintId");

-- CreateIndex
CREATE INDEX "UserCoin_userId_idx" ON "UserCoin"("userId");

-- CreateIndex
CREATE INDEX "UserCoin_coinId_idx" ON "UserCoin"("coinId");

-- CreateIndex
CREATE INDEX "UserCoin_currencyCode_idx" ON "UserCoin"("currencyCode");

-- CreateIndex
CREATE INDEX "Message_fromId_idx" ON "Message"("fromId");

-- CreateIndex
CREATE INDEX "Message_toId_idx" ON "Message"("toId");

-- CreateIndex
CREATE INDEX "CoinWishlist_userId_idx" ON "CoinWishlist"("userId");

-- CreateIndex
CREATE INDEX "CoinWishlist_coinId_idx" ON "CoinWishlist"("coinId");

-- CreateIndex
CREATE UNIQUE INDEX "CoinWishlist_userId_coinId_key" ON "CoinWishlist"("userId", "coinId");

-- CreateIndex
CREATE INDEX "CoinRefWishlist_userId_idx" ON "CoinRefWishlist"("userId");

-- CreateIndex
CREATE INDEX "CoinRefWishlist_coinRefId_idx" ON "CoinRefWishlist"("coinRefId");

-- CreateIndex
CREATE UNIQUE INDEX "CoinRefWishlist_userId_coinRefId_key" ON "CoinRefWishlist"("userId", "coinRefId");

-- CreateIndex
CREATE INDEX "Contact_userId_idx" ON "Contact"("userId");

-- CreateIndex
CREATE INDEX "Contact_userContactId_idx" ON "Contact"("userContactId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_userContactId_key" ON "Contact"("userId", "userContactId");

-- CreateIndex
CREATE INDEX "CoinPriceHistory_coinId_idx" ON "CoinPriceHistory"("coinId");

-- CreateIndex
CREATE INDEX "CoinRefPriceHistory_coinRefId_idx" ON "CoinRefPriceHistory"("coinRefId");

-- CreateIndex
CREATE INDEX "UserCoinsPriceHistory_userId_idx" ON "UserCoinsPriceHistory"("userId");
