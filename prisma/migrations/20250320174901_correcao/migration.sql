/*
  Warnings:

  - You are about to drop the `_CommentToTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topicId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToTopic" DROP CONSTRAINT "_CommentToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToTopic" DROP CONSTRAINT "_CommentToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "topicId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CommentToTopic";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
