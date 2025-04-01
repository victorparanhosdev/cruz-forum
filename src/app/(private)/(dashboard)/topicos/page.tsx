import { Button, FilterPopover } from '@/components'
import {
  ArrowLeft,
  FadersHorizontal,
  ListDashes,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import Link from 'next/link'
import { fetchCardMyTopics } from './fetchCardMyTopics'
import { SearchTitleProps } from '../../(inicio)/page'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { SkeletonTopic } from '@/components/Topic'
import { PaginationControl } from './PaginationControl'
import { SearchMyTopics } from './SearchMyTopics'
import { TopicMyTopic } from './TopicMyTopics'

export const metadata: Metadata = {
  title: 'Meus Topicos',
}


async function ComponentMyTopicsTopicFeed({ searchTitle }: SearchTitleProps) {
  const { data: postsData, meta } = await fetchCardMyTopics({ searchTitle })

  if (Number(searchTitle?.page) > meta.totalPages) {
    redirect('/topicos')
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {Array.isArray(postsData) && postsData.length > 0 ? (
        postsData.map((topic) => <TopicMyTopic key={topic.id} data={topic} />)
      ) : (
        <p className=" col-span-2 py-4 text-center">Nenhum tópico encontrado</p>
      )}
    </div>
  )
}

const CounterPagination = async ({ searchTitle }: SearchTitleProps) => {
  const { meta } = await fetchCardMyTopics({ searchTitle })

  return (
    <p className="text-sm font-medium">{`Pagina de ${meta.totalPages === 0 ? 0 : meta.currentPage} a ${meta.totalPages}`}</p>
  )
}

export default async function Topicos(params: {
  searchParams: Promise<{ q?: string; _sort?: string; page?: string }>
}) {
  const searchParams = await params.searchParams

  return (
    <main className="rounded-xl bg-stone-950 px-4 py-12">
      <h1 className="flex gap-2 text-3xl font-bold">
        Meus Topicos
        <ListDashes weight="bold" size={36} />
      </h1>
      <section className="grid gap-4 pt-9">
        <div className="flex gap-3">
          <Link href={'/'} className="flex">
            <Button iconLeft={ArrowLeft} state="transparent">
              Voltar
            </Button>
          </Link>

          <SearchMyTopics />
        </div>

        <div className="flex items-center justify-between">
          <FilterPopover>
            <Button state="transparent" iconRight={FadersHorizontal}>
              Ordernar
            </Button>
          </FilterPopover>
          <Suspense>
            <CounterPagination searchTitle={searchParams} />
          </Suspense>
        </div>

        <div className="grid gap-4">
          <Suspense fallback={<SkeletonTopic />}>
            <ComponentMyTopicsTopicFeed searchTitle={searchParams} />
          </Suspense>

          <PaginationControl searchTitle={searchParams} />
        </div>
      </section>
    </main>
  )
}
