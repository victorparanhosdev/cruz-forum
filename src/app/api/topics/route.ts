import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import {authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '6');
    const titleSearch = searchParams.get('title') || '';

    const skip = (page - 1) * perPage;
    const topics = await prisma.topic.findMany({
      where: titleSearch 
      ? {
        title: {
            contains: titleSearch,
            mode: 'insensitive',
          }
        } 
      : {},
      skip,
      take: perPage,
    
      include: {
        _count: {
          select: {
            comments: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc' 
      }
    });
    

    const totalTopics = await prisma.topic.count({
      where: titleSearch 
      ? {
        title: {
            contains: titleSearch,
            mode: 'insensitive'
          }
        } 
      : {}
    });
    const totalPages = Math.ceil(totalTopics / perPage);

    const formattedTopics = topics.map(topic => ({
      ...topic,
      amountComments: topic._count.comments,
      _count: undefined
    }));
    
    return NextResponse.json({
      data: formattedTopics,
      meta: {
        currentPage: page,
        perPage,
        totalItems: totalTopics,
        totalPages
      }
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {

  try {
    const session = await getServerSession(authOptions)


    if(!session) {
      return NextResponse.json({message: 'Usuario nao autenicado'}, {
        status: 401
      })
    }
    
    const { title, descricao } = await req.json()


    const newTopic = await prisma.topic.create({
      data: {
        title,
        descricao,
        userId: Number(session.user.id)
      },
    })

    return NextResponse.json(newTopic)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro desconhecido' }, { status: 500 })
  }
}