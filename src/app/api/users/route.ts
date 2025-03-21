import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const allUsers = await prisma.user.findMany()
    return NextResponse.json(allUsers)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
