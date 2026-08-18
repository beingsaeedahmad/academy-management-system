/*
  Warnings:

  - You are about to drop the column `examDate` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `examName` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Result` table. All the data in the column will be lost.
  - Added the required column `className` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Made the column `grade` on table `Result` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Result_examName_idx";

-- DropIndex
DROP INDEX "Result_subjectId_idx";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "examDate",
DROP COLUMN "examName",
DROP COLUMN "subjectId",
ADD COLUMN     "className" TEXT NOT NULL,
ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "session" TEXT NOT NULL DEFAULT 'Academic Session',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "subject" TEXT NOT NULL,
ALTER COLUMN "grade" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Result_className_idx" ON "Result"("className");

-- CreateIndex
CREATE INDEX "Result_session_idx" ON "Result"("session");

-- CreateIndex
CREATE INDEX "Result_subject_idx" ON "Result"("subject");

-- CreateIndex
CREATE INDEX "Result_status_idx" ON "Result"("status");
