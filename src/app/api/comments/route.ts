import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const allComments = await prisma.comment.findMany()
    return NextResponse.json(allComments)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
