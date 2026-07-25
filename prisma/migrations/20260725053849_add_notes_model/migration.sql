/*
  Warnings:

  - You are about to drop the column `description` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `downloads` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "description",
DROP COLUMN "downloads",
DROP COLUMN "fileName",
DROP COLUMN "fileSize";
