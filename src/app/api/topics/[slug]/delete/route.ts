import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }) {
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
  })

  if (!topic) {
    return NextResponse.json(
      { error: 'Tópico não existe' },
      { status: 404 },
    )
  }

  if (topic.userId !== session.user.id) {
    return NextResponse.json(
      { error: 'Usuário não é o dono do tópico' },
      { status: 403 },
    )
  }

  try {
    await prisma.topic.delete({
      where: { slug: Number(getParams.slug) },
    })

    return NextResponse.json(
      { message: `Tópico ${topic.title} excluído com sucesso` },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { error: 'Erro internal 500: Erro ao excluir o tópico' },
      { status: 500 },
    )
  }
}
