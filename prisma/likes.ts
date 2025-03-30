import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Buscar dados existentes
  const [users, topics, comments] = await Promise.all([
    prisma.user.findMany({ select: { id: true } }),
    prisma.topic.findMany({ select: { id: true } }),
    prisma.comment.findMany({ select: { id: true } })
  ]);

  if (!users.length || !topics.length || !comments.length) {
    console.error('Precisa ter usuários, tópicos e comentários no banco!');
    return;
  }

  const userIds = users.map(u => u.id);
  const topicIds = topics.map(t => t.id);
  const commentIds = comments.map(c => c.id);

  // Criar Topic Likes
  const topicLikesData = [];
  for (const topicId of topicIds) {
    const likesCount = faker.number.int({ min: 5, max: 15 });
    const uniqueUserIds = faker.helpers.arrayElements(userIds, likesCount);
    
    uniqueUserIds.forEach(userId => {
      topicLikesData.push({
        userId,
        topicId,
        createdAt: faker.date.between({ from: new Date('2024-01-01'), to: new Date() })
      });
    });
  }

  // Criar Comment Likes
  const commentLikesData = [];
  for (const commentId of commentIds) {
    const likesCount = faker.number.int({ min: 3, max: 10 });
    const uniqueUserIds = faker.helpers.arrayElements(userIds, likesCount);
    
    uniqueUserIds.forEach(userId => {
      commentLikesData.push({
        userId,
        commentId,
        createdAt: faker.date.between({ from: new Date('2024-01-01'), to: new Date() })
      });
    });
  }

  // Inserir em lotes
  await prisma.$transaction([
    prisma.topicLike.createMany({ data: topicLikesData }),
    prisma.commentLike.createMany({ data: commentLikesData })
  ]);

  console.log(`✅ Likes criados:
  - ${topicLikesData.length} likes em tópicos
  - ${commentLikesData.length} likes em comentários`);
}

main()
  .catch(e => {
    console.error('Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });