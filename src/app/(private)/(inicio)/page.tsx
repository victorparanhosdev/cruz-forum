import { TopicWithPaginationProps } from '@/app/api/topics/route'
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
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLineLeft,
  CaretLineRight,
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

export const metadata: Metadata = {
  title: 'Feed',
}

export type CardRelevantProps = {
  id: string
  title: string
  createdAt: string
  image: string
  slug: number
}

async function CardFeed({
  searchTitle,
}: {
  searchTitle?: { q?: string; _sort?: string }
}) {
  const hasFilters = searchTitle && Object.keys(searchTitle).length > 0

  let url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics`

  if (hasFilters) {
    const queryParams = new URLSearchParams()
    if (searchTitle?.q) queryParams.set('q', searchTitle.q)
    if (searchTitle?._sort) queryParams.set('_sort', searchTitle._sort)
    url += `?${queryParams.toString()}`
  }

  try {
    const response = await fetchAPI({
      url,
      method: 'GET',
      next: { tags: ['feed'] }, // Cacheamento adequado para Server Components
    })

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar tópicos: ${response.status} - ${response.statusText}`,
      )
    }

    const { data }: TopicWithPaginationProps = await response.json()

    return (
      <div className="grid min-h-[650px] grid-cols-2 gap-x-6 gap-y-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((topic) => <Topic key={topic.id} data={topic} />)
        ) : (
          <p className="col-span-2 py-4 text-center">
            Nenhum tópico encontrado
          </p>
        )}
      </div>
    )
  } catch (error) {
    console.error('Erro ao buscar tópicos:', error)
    return (
      <p className="col-span-2 py-4 text-center text-red-500">
        Erro ao carregar tópicos.
      </p>
    )
  }
}

async function CardRelevant() {
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

async function handleCreateTopicsFeed({
  descricao,
  title,
}: CreateTopicFormData) {
  'use server'
  await fetchAPI({
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics`,
    method: 'POST',
    data: { descricao, title },
  })

  revalidateTag('feed')
}

export default async function Inicio(params: {
  searchParams: Promise<{ q?: string; _sort?: string }>
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
            <p className="text-sm font-medium">Pagina de 1 a 6</p>
          </div>

          <div className="grid gap-4">
            <Suspense fallback={<SkeletonTopic />}>
              <CardFeed searchTitle={searchParams} />
            </Suspense>

            <div className="flex place-content-end items-center gap-2">
              <CaretDoubleLeft size={24} />
              <CaretLineLeft size={24} />
              <CaretLineRight size={24} />
              <CaretDoubleRight size={24} />
            </div>
          </div>
        </section>
      </main>
      <aside className="rounded-xl bg-stone-950 px-4 pt-12">
        <h2 className="mb-8 flex items-center gap-1 text-sm">
          <StarFour size={16} /> Mais Relevantes
        </h2>

        <Suspense fallback={<h1>Carregando....</h1>}>
          <CardRelevant />
        </Suspense>
      </aside>
    </div>
  )
}
