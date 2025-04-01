import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }) {
  const getParams = await params

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      { status: 401 },
    )
  }

  const topic = await prisma.topic.findUnique({
    where: { slug: Number(getParams.slug) },
    include: {
      likes: true,
    },
  })

  if (!topic) {
    return NextResponse.json({ error: 'Tópico não existe' }, { status: 404 })
  }

  const isTopicLikes = topic.likes.some(
    (item) => item.userId === session.user.id,
  )

  if (isTopicLikes) {
    await prisma.topicLike.delete({
      where: {
        userId_topicId: {
          userId: session.user.id,
          topicId: topic.id,
        },
      },
    })

    return NextResponse.json({ isLike: !isTopicLikes })
  }

  try {
    await prisma.topicLike.create({
      data: {
        userId: session.user.id,
        topicId: topic.id,
      },
    })
    return NextResponse.json({ isLike: !isTopicLikes })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro internal server 500' },
      { status: 500 },
    )
  }
}
