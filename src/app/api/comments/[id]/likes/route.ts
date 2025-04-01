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

  const comment = await prisma.comment.findUnique({
    where: { id: getParams.id },
    include: {
      likes: true,
    },
  })

  if (!comment) {
    return NextResponse.json(
      { error: 'Comentario não existe' },
      { status: 404 },
    )
  }

  const isCommentLike = comment.likes.some(
    (item) => item.userId === session.user.id,
  )

  if (isCommentLike) {
    await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId: session.user.id,
          commentId: comment.id,
        },
      },
    })

    return NextResponse.json({ isLike: !isCommentLike })
  }

  try {
    await prisma.commentLike.create({
      data: {
        userId: session.user.id,
        commentId: comment.id,
      },
    })
    return NextResponse.json({ isLike: !isCommentLike })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro internal server 500' },
      { status: 500 },
    )
  }
}
