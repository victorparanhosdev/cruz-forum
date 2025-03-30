import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Buscar todos os IDs de usuários existentes
  const users = await prisma.user.findMany({
    select: { id: true }
  });

  if (users.length === 0) {
    console.error('Nenhum usuário encontrado. Crie usuários primeiro.');
    return;
  }

  const userIds = users.map(user => user.id);

  // Gerar dados para os tópicos
  const numberOfTopics = 100; // Altere este número conforme necessário
  const topicsData = [];

  for (let i = 0; i < numberOfTopics; i++) {
    topicsData.push({
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      descricao: faker.lorem.paragraphs({ min: 1, max: 3 }),
      userId: faker.helpers.arrayElement(userIds),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Inserir em lotes para melhor desempenho
  const batchSize = 100;
  for (let i = 0; i < topicsData.length; i += batchSize) {
    const batch = topicsData.slice(i, i + batchSize);
    await prisma.topic.createMany({
      data: batch,
    });
    console.log(`Batch ${i / batchSize + 1} de tópicos inserido.`);
  }

  console.log(`Foram criados ${numberOfTopics} tópicos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });