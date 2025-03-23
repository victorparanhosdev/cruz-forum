import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/auth-options'
import { getServerSession } from 'next-auth'

export interface User {
  image: string
  name: string
}

export interface Comment {
  id: string
  descricao: string
  userId: string
  topicId: string
  createdAt: string
  updatedAt: string
  user: User
  _count: {
    likes: number
  }
}

export interface Topic {
  id: string
  title: string
  descricao: string
  userId: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
  user: User
}

export async function GET(req: NextRequest, { params }) {
  const topicId = await params

  try {
    const allTopicComments = await prisma.topic.findUnique({
      where: {
        id: topicId.id,
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                image: true,
                name: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
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
      comments: allTopicComments.comments.map((comment) => ({
        ...comment,
        user: undefined,
        image: comment.user.image,
        name: comment.user.name,
        _count: undefined,
        likes: comment._count.likes,
      })),
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

export async function POST(req: NextRequest, { params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      {
        status: 401,
      },
    )
  }

  const topicId = await params
  const body = await req.json()

  const { descricao } = body

  try {
    const createComment = await prisma.comment.create({
      data: {
        descricao,
        topicId: topicId.id,
        userId: session.user.id,
      },
    })

    return NextResponse.json(createComment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro Internal' + error },
      { status: 500 },
    )
  }
}
