import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import { Prisma, Topic } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export type SavedTopicFeed = Topic & {
  likes: number
  comments: number
  image: string | null
  isAuthorTopic: boolean
  isAuthorSavedTopic: boolean
  isAuthorLikeTopic: boolean
}

export type TopicSavedFeedWithPaginationProps = {
  data: SavedTopicFeed[]
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

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      { status: 401 },
    )
  }

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = parseInt(searchParams.get('per_page') || '6')
  const titleSearch = searchParams.get('q') || ''
  const _sort = searchParams.get('_sort')
  const skip = (page - 1) * perPage
  const orderBy = getOrderBy(_sort)

  const verifySaved = await prisma.savedTopic
    .findMany({
      where: {
        userId: session.user.id,
      },
    })
    .then((res) => {
      return res.map((item) => item.topicId)
    })

  const verifyTopicLikes = await prisma.topicLike
    .findMany({
      where: {
        userId: session.user.id,
      },
    })
    .then((res) => {
      return res.map((item) => item.topicId)
    })

  const where = {
    savedBy: {
      some: {
        userId: session.user.id,
      },
    },
    title: {
      contains: titleSearch.trim(),
      mode: Prisma.QueryMode.insensitive,
    },
  }

  let topics: SavedTopicFeed[]

  if (_sort === 'relevant') {
    topics = await prisma.topic
      .findMany({
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
      .then((res) => {
        return res
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
            isAuthorTopic: Boolean(item.userId === session.user.id),
            isAuthorSavedTopic: verifySaved.includes(item.id),
            isAuthorLikeTopic: verifyTopicLikes.includes(item.id),
          }))
      })
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
          isAuthorTopic: Boolean(item.userId === session.user.id),
          isAuthorSavedTopic: verifySaved.includes(item.id),
          isAuthorLikeTopic: verifyTopicLikes.includes(item.id),
        })),
      )
  }

  try {
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
  } catch {
    return NextResponse.json(
      { error: 'Erro internal 500: Erro ao excluir o tópico' },
      { status: 500 },
    )
  }
}
