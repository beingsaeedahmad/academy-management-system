-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "category" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "uploadedBy" TEXT;
