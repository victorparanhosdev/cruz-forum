import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/auth-options'

export async function GET(req: NextRequest, { params }) {
  const getParams = await params

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      {
        status: 401,
      },
    )
  }

  try {
    const verifySaved = await prisma.savedTopic
      .findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          slug: true,
        },
      })
      .then((res) => {
        return res.map((item) => item.slug)
      })

    const topic = await prisma.topic.findUnique({
      where: {
        slug: Number(getParams.slug),
      },
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    })

    if (!topic) {
      return NextResponse.json({ error: 'Topico não existe' }, { status: 404 })
    }

    const topicWithComments = {
      ...topic,
      user: undefined,
      image: topic.user.image,
      name: topic.user.name,
      isAuthorTopic: topic.userId === session.user.id,
      isAuthorSavedTopic: verifySaved.includes(topic.slug),
    }

    return NextResponse.json(topicWithComments, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro Internal' + error },
      { status: 500 },
    )
  }
}
