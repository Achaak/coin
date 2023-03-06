/*
  Warnings:

  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `symbol` on the `Currency` table. All the data in the column will be lost.
  - Added the required column `code` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
DROP COLUMN "symbol",
ADD COLUMN     "code" TEXT NOT NULL,
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("code");
