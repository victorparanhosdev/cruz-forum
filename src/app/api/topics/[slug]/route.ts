import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }) {
  const getParams = await params

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
    }

    return NextResponse.json(topicWithComments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro Internal' + error },
      { status: 500 },
    )
  }
}
