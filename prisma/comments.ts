import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Buscar todos os usuários e tópicos existentes
  const [users, topics] = await Promise.all([
    prisma.user.findMany({ select: { id: true } }),
    prisma.topic.findMany({ select: { id: true } })
  ]);

  if (users.length === 0 || topics.length === 0) {
    console.error('Certifique-se de que existem usuários e tópicos no banco!');
    return;
  }

  const userIds = users.map(user => user.id);
  const topicIds = topics.map(topic => topic.id);

  // Criar comentários
  const commentsData = [];
  
  for (const topicId of topicIds) {
    const commentsPerTopic = faker.number.int({ min: 3, max: 8 });
    
    for (let i = 0; i < commentsPerTopic; i++) {
      commentsData.push({
        descricao: faker.lorem.paragraph({ min: 1, max: 3 }),
        userId: faker.helpers.arrayElement(userIds),
        topicId: topicId,
        createdAt: faker.date.between({ 
          from: new Date('2024-01-01'), 
          to: new Date() 
        }),
        updatedAt: new Date()
      });
    }
  }

  // Inserção em lotes
  const batchSize = 500;
  for (let i = 0; i < commentsData.length; i += batchSize) {
    const batch = commentsData.slice(i, i + batchSize);
    await prisma.comment.createMany({ data: batch });
    console.log(`Comentários ${i + 1}-${i + batch.length} inseridos`);
  }

  console.log(`✅ ${commentsData.length} comentários criados com sucesso!`);
}

main()
  .catch(e => {
    console.error('Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });