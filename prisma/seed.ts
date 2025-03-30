import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

const prisma = new PrismaClient();

async function getRandomImage() {
  const response = await axios.get('https://picsum.photos/200');
  return response.request.res.responseUrl;
}

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criação de usuários
  console.log('Criando 50 usuários...');
  const usersPromises = Array.from({ length: 50 }).map(async () => {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: faker.date.recent(),
        image: await getRandomImage(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const accountPromise = prisma.account.create({
      data: {
        userId: user.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId: faker.string.uuid(),
        refresh_token: faker.string.uuid(),
        access_token: faker.string.uuid(),
        expires_at: 1680000000,
        token_type: 'Bearer',
        scope: 'read write',
        id_token: faker.string.uuid(),
        session_state: faker.string.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const sessionPromise = prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: faker.string.uuid(),
        expires: faker.date.future(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Aguardando a criação da conta e sessão
    await Promise.all([accountPromise, sessionPromise]);
    return user;
  });

  // Aguardando todos os usuários serem criados
  await Promise.all(usersPromises);
  console.log('✅ 50 usuários criados com sucesso!');

  // Buscar IDs dos usuários
  const users = await prisma.user.findMany({
    select: { id: true }
  });
  
  if (users.length === 0) {
    console.error('❌ Nenhum usuário encontrado. Abortando seed.');
    return;
  }
  
  const userIds = users.map(user => user.id);

  // Criação de tópicos
  console.log('Criando 100 tópicos...');
  const numberOfTopics = 100; 
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

  const topicBatchSize = 100;
  for (let i = 0; i < topicsData.length; i += topicBatchSize) {
    const batch = topicsData.slice(i, i + topicBatchSize);
    await prisma.topic.createMany({
      data: batch,
    });
    console.log(`Batch ${Math.floor(i / topicBatchSize) + 1} de tópicos inserido.`);
  }
  console.log(`✅ ${numberOfTopics} tópicos criados com sucesso!`);

  // Buscar tópicos para criar comentários
  const topics = await prisma.topic.findMany({ 
    select: { id: true } 
  });

  if (topics.length === 0) {
    console.error('❌ Nenhum tópico encontrado. Abortando seed.');
    return;
  }
  
  const topicIds = topics.map(topic => topic.id);

  // Criação de comentários
  console.log('Criando comentários para os tópicos...');
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

  // Inserção em lotes de comentários
  const commentBatchSize = 500;
  for (let i = 0; i < commentsData.length; i += commentBatchSize) {
    const batch = commentsData.slice(i, i + commentBatchSize);
    await prisma.comment.createMany({ data: batch });
    console.log(`Comentários ${i + 1}-${Math.min(i + batch.length, commentsData.length)} inseridos`);
  }
  console.log(`✅ ${commentsData.length} comentários criados com sucesso!`);

  // Buscar comentários para criar likes
  const comments = await prisma.comment.findMany({ 
    select: { id: true } 
  });

  if (comments.length === 0) {
    console.error('❌ Nenhum comentário encontrado. Abortando seed.');
    return;
  }
  
  const commentIds = comments.map(comment => comment.id);

  // Criação de likes em tópicos
  console.log('Criando likes para tópicos e comentários...');
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

  // Criação de likes em comentários
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

  // Inserir likes em lotes usando transação
  await prisma.$transaction([
    prisma.topicLike.createMany({ data: topicLikesData }),
    prisma.commentLike.createMany({ data: commentLikesData })
  ]);

  console.log(`✅ Likes criados com sucesso:
  - ${topicLikesData.length} likes em tópicos
  - ${commentLikesData.length} likes em comentários`);

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no processo de seed:');
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Conexão com o banco de dados encerrada.');
  });