/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `SavedTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SavedTopic_slug_key" ON "SavedTopic"("slug");
