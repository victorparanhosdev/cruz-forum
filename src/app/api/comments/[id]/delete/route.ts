import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      {
        status: 401,
      },
    )
  }
  const { id } = await params

  const comments = await prisma.comment.findUnique({
    where: {
      id,
    },
  })

  if (!comments) {
    return NextResponse.json(
      { error: 'Esse comentario nao existe' },
      { status: 404 },
    )
  }

  if (comments.userId !== session.user.id) {
    return NextResponse.json(
      { error: 'Voce não pode excluir um comentario que não é seu' },
      { status: 400 },
    )
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      { message: 'Comentario excluido com sucesso' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro Interno: ' + error.message },
      { status: 500 },
    )
  }
}
