import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export interface TopicCommentsProps {
  id: string
  descricao: string
  createdAt: string
  userId: string
  image: string
  name: string
  isAuthorComment: boolean
  isAuthorLikeComment: boolean
  likes: number
}

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

  const verifyCommentLikes = await prisma.commentLike
    .findMany({
      where: {
        userId: session.user.id,
      },
    })
    .then((res) => {
      return res.map((item) => item.commentId)
    })

  try {
    const topic = await prisma.topic.findUnique({
      where: {
        slug: Number(getParams.slug),
      },
      select: {
        comments: {
          select: {
            id: true,
            descricao: true,
            createdAt: true,
            userId: true,
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
      },
    })

    if (!topic) {
      return NextResponse.json(
        { error: 'Tópico não encontrado' },
        { status: 404 },
      )
    }

    const topicComments = topic.comments.map((item) => {
      return {
        id: item.id,
        descricao: item.descricao,
        createdAt: item.createdAt,
        userId: item.userId,
        image: item.user.image,
        name: item.user.name,
        isAuthorComment: item.userId === session.user.id,
        likes: item._count.likes,
        isAuthorLikeComment: verifyCommentLikes.includes(item.id),
      }
    })

    return NextResponse.json(topicComments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno: ' + error.message },
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

  const topicSlug = await params
  const body = await req.json()

  const { descricao } = body

  if (!descricao) {
    return NextResponse.json(
      { error: 'descrição não encontrada' },
      { status: 404 },
    )
  }

  try {
    const topic = await prisma.topic.findUnique({
      where: {
        slug: Number(topicSlug.slug),
      },
    })

    if (!topic) {
      return NextResponse.json(
        { error: 'Tópico não encontrado' },
        { status: 404 },
      )
    }

    const createComment = await prisma.comment.create({
      data: {
        descricao,
        userId: session.user.id,
        topicId: topic.id,
      },
    })

    return NextResponse.json(createComment, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro Interno: ' + error.message },
      { status: 500 },
    )
  }
}
