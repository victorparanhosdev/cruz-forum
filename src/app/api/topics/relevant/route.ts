import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const getTopics = await prisma.topic
      .findMany({
        select: {
          id: true,
          title: true,
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
            },
          },
          comments: {
            select: {
              createdAt: true,
            },
          },
        },
        skip: 0,
        take: 5,
      })
      .then((res) => {
        return res
          .sort((a, b) => {
            const aRelevance = a._count.comments + a._count.likes
            const bRelevance = b._count.comments + b._count.likes

            return bRelevance - aRelevance
          })
          .map((item) => ({
            id: item.id,
            title: item.title,
            image: item.user.image,
            slug: item.slug,
            lastCommentAt:
              item.comments.length > 0
                ? item.comments.reduce((latest, comment) =>
                    comment.createdAt > latest.createdAt ? comment : latest,
                  ).createdAt
                : null,
          }))
      })

    return NextResponse.json(getTopics, { status: 200 })
  } catch (erro) {
    return NextResponse.json(
      { error: 'Erro interno do servidor', erro },
      { status: 500 },
    )
  }
}
