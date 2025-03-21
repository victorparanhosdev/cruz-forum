import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    topics: {
      create: [
        {
          title: 'Join the Prisma Discord',
          descricao: 'https://pris.ly/discord',
        },
        {
          title: 'Prisma on YouTube',
          descricao: 'https://pris.ly/youtube',
        },
      ],
    },
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    topics: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          descricao: 'https://www.twitter.com/prisma',
        },
      ],
    },
  },
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
