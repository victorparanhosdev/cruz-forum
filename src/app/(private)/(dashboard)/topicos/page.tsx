import { Button, FilterPopover } from '@/components'
import { FadersHorizontal, ListDashes } from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import { fetchCardMyTopics } from './fetchCardMyTopics'
import { SearchTitleProps } from '../../(inicio)/page'
import { Suspense } from 'react'
import { SearchMyTopics } from './SearchMyTopics'
import { SectionTopicos } from './SectionTopicos'
import { BackButton } from '../../_components/BackButton'
import { SkeletonCards } from '../../_components/SkeletonCards'

export const metadata: Metadata = {
  title: 'Meus Topicos',
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
    <main className="h-auto w-full bg-stone-950 px-1.5 pt-24 ring-1 ring-stone-900 min-[330px]:px-4 md:rounded-xl md:pt-12">
      <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
        Meus Topicos
        <ListDashes weight="bold" className="size-6 md:size-9" />
      </h1>
      <section className="grid gap-4 pt-6 md:pt-9">
        <div className="flex gap-3">
          <BackButton />

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
          <Suspense fallback={<SkeletonCards />}>
            <SectionTopicos searchTitle={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
