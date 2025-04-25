import { Button, FilterPopover } from '@/components'
import {
  BookmarkSimple,
  FadersHorizontal,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchTitleProps } from '../../(inicio)/page'
import { fetchCardSalvos } from './fetchCardSalvos'
import { SearchSalvos } from './SearchSalvos'
import { SectionSalvos } from './SectionSalvos'
import { BackButton } from '../../_components/BackButton'
import { SkeletonCards } from '../../_components/SkeletonCards'

export const metadata: Metadata = {
  title: 'Salvos',
}
export const dynamic = 'force-dynamic'

const CounterPagination = async ({ searchTitle }: SearchTitleProps) => {
  const { meta } = await fetchCardSalvos({ searchTitle })

  return (
    <p className="text-sm font-medium">{`Pagina de ${meta.totalPages === 0 ? 0 : meta.currentPage} a ${meta.totalPages}`}</p>
  )
}

export default async function Salvos(params: {
  searchParams: Promise<{ q?: string; _sort?: string; page?: string }>
}) {
  const searchParams = await params.searchParams

  return (
    <main className="h-auto w-full rounded-none bg-stone-950 px-1.5 pt-24 ring-1 ring-stone-900 min-[330px]:px-4 md:rounded-xl md:pt-12">
      <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
        Salvos
        <BookmarkSimple weight="bold" className="size-6 md:size-9" />
      </h1>

      <section className="grid gap-4 pt-6 md:pt-9">
        <div className="flex gap-3">
          <BackButton />
          <SearchSalvos />
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
            <SectionSalvos searchTitle={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
