import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }) {
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

  try {
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

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro Interno: ' + error.message },
      { status: 500 },
    )
  }
}
