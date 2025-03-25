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
    const allTopicComments = await prisma.topic.findUnique({
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

    const topicWithComments = {
      ...allTopicComments,
      user: undefined,
      image: allTopicComments.user.image,
      name: allTopicComments.user.name,
      isAuthorTopic: allTopicComments.userId === session.user.id,
    }

    return NextResponse.json(topicWithComments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro Internal' + error },
      { status: 500 },
    )
  }
}
