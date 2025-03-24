import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const getTopics = await prisma.topic.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        slug: true,
        user: {
          select: {
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            savedBy: true,
          },
        },
      },
    })

    const topicsRelevants = getTopics
      .sort((a, b) => {
        const aRelevance = a._count.comments + a._count.likes + a._count.savedBy
        const bRelevance = b._count.comments + b._count.likes + b._count.savedBy
        return bRelevance - aRelevance
      })
      .map((item) => ({
        id: item.id,
        title: item.title,
        createdAt: item.createdAt,
        image: item.user.image,
        slug: item.slug,
      }))
      .slice(0, 5)

    return NextResponse.json(topicsRelevants)
  } catch (erro) {
    return NextResponse.json(
      { error: 'Erro interno do servidor', erro },
      { status: 500 },
    )
  }
}
