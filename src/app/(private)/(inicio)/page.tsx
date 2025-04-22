import { Button, Topic, FilterPopover, TopicDialog } from '@/components'
import { CreateTopicFormData } from '@/components/TopicDialog'
import { fetchAPI } from '@/lib/fetchAPI'

import { Chats, FadersHorizontal, Plus } from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import { Suspense } from 'react'

import { SearchTopic } from './SearchTopic'
import { SkeletonTopic } from '@/components/Topic'
import { fetchCardFeed } from './fetchCardFeed'
import { PaginationControl } from './PaginationControl'
import { redirect } from 'next/navigation'
import { Aside } from './Aside'
import { TriggerButtonRelevant } from './_components/trigger-button-relevant'

export const metadata: Metadata = {
  title: 'Feed',
}

const CardFeedContent = async ({ searchTitle }: SearchTitleProps) => {
  const { data, meta } = await fetchCardFeed({ searchTitle })

  if (Number(searchTitle?.page) > meta.totalPages) {
    redirect('/')
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 min-[980px]:grid-cols-2">
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
    <>
      <div className="grid min-h-screen w-full gap-4 min-[1280px]:grid-cols-view-home">
        <main className="flex h-full flex-col bg-stone-950 px-1.5 pt-24 ring-1 ring-stone-900 min-[330px]:px-4 md:rounded-xl md:pt-12">
          <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
            Feed <Chats weight="bold" className="size-6 md:size-9" />
          </h1>

          <section className="grid gap-4 pt-6 md:pt-9">
            <div className="flex gap-4">
              <SearchTopic />
              <TopicDialog onCreateTopic={handleCreateTopicsFeed}>
                <Button
                  iconLeft={Plus}
                  className="[&>span]:hidden [&>span]:md:inline"
                >
                  Criar tópico
                </Button>
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
        <Aside />
      </div>
      <TriggerButtonRelevant />
    </>
  )
}
