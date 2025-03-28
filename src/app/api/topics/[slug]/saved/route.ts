import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import { SavedTopic, Topic } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface TopicWithSaved extends Topic {
  savedBy: SavedTopic[]
}

export async function PUT(req: NextRequest, { params }) {
  const getParams = await params

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      { status: 401 },
    )
  }

  const topic: TopicWithSaved = await prisma.topic.findUnique({
    where: { slug: Number(getParams.slug) },
    include: {
      savedBy: true,
    },
  })

  if (!topic) {
    return NextResponse.json({ error: 'Tópico não existe' }, { status: 404 })
  }

  const isTopicSaved = topic.savedBy.some(
    (item) => item.userId === session.user.id,
  )

  if (isTopicSaved) {
    await prisma.savedTopic.delete({
      where: {
        slug: Number(getParams.slug),
      },
    })
    return NextResponse.json({
      message: 'Topico Removido',
      isSaved: !isTopicSaved,
    })
  }

  try {
    await prisma.savedTopic.create({
      data: {
        userId: session.user.id,
        topicId: topic.id,
        slug: Number(getParams.slug),
      },
    })
    return NextResponse.json({
      message: 'Topico salvo com sucesso',
      isSaved: !isTopicSaved,
    })
  } catch {
    return NextResponse.json(
      { error: 'Erro internal 500: Erro ao excluir o tópico' },
      { status: 500 },
    )
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      { status: 401 },
    )
  }

  try {
    const Saved = await prisma.savedTopic.findMany({
      where: {
        userId: session.user.id,
      },
    })

    if (!Saved) {
      return NextResponse.json(
        { error: 'Vôce não tem nenhum topico salvo ainda' },
        { status: 404 },
      )
    }

    return NextResponse.json(Saved)
  } catch {
    return NextResponse.json(
      { error: 'Erro internal 500: Erro ao excluir o tópico' },
      { status: 500 },
    )
  }
}
