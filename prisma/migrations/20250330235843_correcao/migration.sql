/*
  Warnings:

  - A unique constraint covering the columns `[userId,topicId]` on the table `SavedTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SavedTopic_userId_topicId_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "SavedTopic_userId_topicId_key" ON "SavedTopic"("userId", "topicId");
