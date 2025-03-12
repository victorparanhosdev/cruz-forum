import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  
  try {
    const allTopics = await prisma.topic.findMany()
    return NextResponse.json(allTopics)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar tópicos' },
      { status: 500 },
    )
  }
}
