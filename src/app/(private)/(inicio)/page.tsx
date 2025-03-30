import {
  Button,
  Card,
  Navigation,
  Topic,
  FilterPopover,
  TopicDialog,
} from '@/components'
import { CreateTopicFormData } from '@/components/TopicDialog'
import { fetchAPI } from '@/lib/fetchAPI'

import {
  Chats,
  FadersHorizontal,
  ListPlus,
  StarFour,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import { Suspense } from 'react'

import { SearchTopic } from './SearchTopic'
import { SkeletonTopic } from '@/components/Topic'
import { fetchCardFeed } from './fetchCardFeed'
import { Skeleton } from '@chakra-ui/react'
import { PaginationControl } from './PaginationControl'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Feed',
}

export type CardRelevantProps = {
  id: string
  title: string
  image: string
  slug: number
  lastCommentAt: string
}

const CardFeedContent = async ({ searchTitle }: SearchTitleProps) => {
  const { data, meta } = await fetchCardFeed({ searchTitle })

  if (Number(searchTitle?.page) > meta.totalPages) {
    redirect('/')
  }

  return (
    <div className="grid min-h-[650px] grid-cols-2 gap-x-6 gap-y-4">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((topic) => <Topic key={topic.id} data={topic} />)
      ) : (
        <p className="col-span-2 py-4 text-center">Nenhum tópico encontrado</p>
      )}
    </div>
  )
}

const CardFeed = ({ searchTitle }: SearchTitleProps) => {
  return (
    <Suspense fallback={<SkeletonTopic />}>
      <CardFeedContent searchTitle={searchTitle} />
    </Suspense>
  )
}

const SkeletonCardRelevantContent = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <Skeleton asChild key={index}>
            <div className="flex min-h-24 cursor-pointer gap-2.5 rounded-lg border border-white bg-topico-200 px-3 py-2 hover:border-green-200 hover:bg-hover-btn-gray" />
          </Skeleton>
        )
      })}
    </div>
  )
}

const CardRelevantContent = async () => {
  const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/relevant`

  const data: CardRelevantProps[] = await fetch(url, {
    next: { tags: ['feed'] },
  })
    .then((res) => res.json())
    .catch(console.error)

  return (
    <div className="flex flex-col gap-4">
      {data.map((dataCard: CardRelevantProps) => {
        return <Card key={dataCard.id} dataCard={dataCard} />
      })}
    </div>
  )
}

const CardRelevantWrapper = () => {
  return (
    <Suspense fallback={<SkeletonCardRelevantContent />}>
      <CardRelevantContent />
    </Suspense>
  )
}

export type SearchTitleProps = {
  searchTitle?: { q?: string; _sort?: string; page?: string }
}

const CounterPagination = async ({ searchTitle }: SearchTitleProps) => {
  const { meta } = await fetchCardFeed({ searchTitle })

  return (
    <p className="text-sm font-medium">{`Pagina de ${meta.totalPages === 0 ? 0 : meta.currentPage} a ${meta.totalPages}`}</p>
  )
}

async function handleCreateTopicsFeed({
  descricao,
  title,
}: CreateTopicFormData) {
  'use server'
  const res = await fetchAPI({
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics`,
    method: 'POST',
    data: { descricao, title },
  })
    .then((data) => data.json())
    .catch(console.error)

  if (res.error) {
    return res
  }

  revalidateTag('feed')
}

export default async function Inicio(params: {
  searchParams: Promise<{ q?: string; _sort?: string; page?: string }>
}) {
  const searchParams = await params.searchParams

  return (
    <div className="grid min-h-view-without-fill w-full grid-cols-view-home gap-6 p-6">
      <Navigation />
      <main className="rounded-xl bg-stone-950 px-4 py-12">
        <h1 className="flex gap-2 text-3xl font-bold">
          Feed <Chats weight="bold" size={36} />
        </h1>

        <section className="grid gap-4 pt-9">
          <div className="flex gap-4">
            <SearchTopic />
            <TopicDialog onCreateTopic={handleCreateTopicsFeed}>
              <Button iconLeft={ListPlus}>Criar tópico</Button>
            </TopicDialog>
          </div>

          <div className="flex items-center justify-between">
            <FilterPopover>
              <Button state="transparent" iconRight={FadersHorizontal}>
                Ordernar
              </Button>
            </FilterPopover>
            <CounterPagination searchTitle={searchParams} />
          </div>

          <div className="grid gap-4">
            <CardFeed searchTitle={searchParams} />
            <PaginationControl searchTitle={searchParams} />
          </div>
        </section>
      </main>
      <aside className="rounded-xl bg-stone-950 px-4 pt-12">
        <h2 className="mb-8 flex items-center gap-1 text-sm">
          <StarFour size={16} /> Mais Relevantes
        </h2>

        <CardRelevantWrapper />
      </aside>
    </div>
  )
}
