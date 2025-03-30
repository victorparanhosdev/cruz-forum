import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

const prisma = new PrismaClient();

async function getRandomImage() {
  const response = await axios.get('https://picsum.photos/200');
  return response.request.res.responseUrl;
}

async function main() {
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
  });

  // Aguardando todos os usuários serem criados
  await Promise.all(usersPromises);

  console.log('50 usuários criados!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
