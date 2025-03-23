import prisma from '@/lib/prisma'
import { Prisma, Topic } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'

export type TopicFeed = Topic & {
  likes: number
  comments: number
  image: string | null
}

export type TopicWithPaginationProps = {
  data: TopicFeed[]
  meta: {
    currentPage: number
    perPage: number
    totalItems: number
    totalPages: number
  }
}

const getOrderBy = (
  _sort: string | null,
): Prisma.TopicOrderByWithRelationInput => {
  switch (_sort) {
    case 'topic':
      return { title: Prisma.SortOrder.asc }
    case '-topic':
      return { title: Prisma.SortOrder.desc }
    case 'likes':
      return { likes: { _count: Prisma.SortOrder.desc } }
    case 'comments':
      return { comments: { _count: Prisma.SortOrder.desc } }
    default:
      return { createdAt: Prisma.SortOrder.desc }
  }
}

export async function GET(
  req: NextRequest,
): Promise<NextResponse<TopicWithPaginationProps | { error: string }>> {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '6')
    const titleSearch = searchParams.get('q') || ''
    const _sort = searchParams.get('_sort')
    const skip = (page - 1) * perPage
    const orderBy = getOrderBy(_sort)

    const where: Prisma.TopicWhereInput = titleSearch
      ? {
          title: {
            contains: titleSearch.trim(),
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {}

    let topics: TopicFeed[]

    if (_sort === 'relevant') {
      const getTopics = await prisma.topic.findMany({
        where,
        include: {
          _count: {
            select: {
              comments: true,
              likes: true,
              savedBy: true,
            },
          },
          user: {
            select: {
              image: true,
            },
          },
        },
        skip,
        take: perPage,
      })

      topics = getTopics
        .sort((a, b) => {
          const aRelevance =
            a._count.comments + a._count.likes + a._count.savedBy
          const bRelevance =
            b._count.comments + b._count.likes + b._count.savedBy
          return bRelevance - aRelevance
        })
        .map((item) => ({
          ...item,
          _count: undefined,
          likes: item._count.likes,
          comments: item._count.comments,
          image: item.user.image,
          user: undefined,
        }))
    } else {
      topics = await prisma.topic
        .findMany({
          where,
          skip,
          include: {
            _count: {
              select: {
                comments: true,
                likes: true,
                savedBy: true,
              },
            },
            user: {
              select: {
                image: true,
              },
            },
          },
          take: perPage,
          orderBy,
        })
        .then((items) =>
          items.map((item) => ({
            ...item,
            _count: undefined,
            likes: item._count.likes,
            comments: item._count.comments,
            image: item.user.image,
            user: undefined,
          })),
        )
    }

    const totalTopics = await prisma.topic.count({ where })
    const totalPages = Math.ceil(totalTopics / perPage)

    return NextResponse.json({
      data: topics,
      meta: {
        currentPage: page,
        perPage,
        totalItems: totalTopics,
        totalPages,
      },
    })
  } catch (erro) {
    return NextResponse.json(
      { error: 'Erro interno do servidor', erro },
      { status: 500 },
    )
  }
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<Topic | { error: string }>> {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        {
          status: 401,
        },
      )
    }

    const { title, descricao }: { title: string; descricao: string } =
      await req.json()

    if (!title || !descricao) {
      throw new Error('É obrigatório o Título e a Descrição')
    }

    const newTopic = await prisma.topic.create({
      data: {
        title: String(title),
        descricao: String(descricao),
        userId: session.user.id,
      },
    })

    return NextResponse.json(newTopic)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
