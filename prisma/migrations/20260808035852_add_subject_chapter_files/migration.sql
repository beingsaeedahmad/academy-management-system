/*
  Warnings:

  - Added the required column `chapter` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "chapter" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL;
