/*
  Warnings:

  - Made the column `slug` on table `SavedTopic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SavedTopic" ALTER COLUMN "slug" SET NOT NULL;
