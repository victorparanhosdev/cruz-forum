import { SavedTopicFeed } from '@/app/api/salvos/route'
import { Button, Input, FilterPopover } from '@/components'
import { SkeletonTopic, Topic } from '@/components/Topic'
import { fetchAPI } from '@/lib/fetchAPI'
import {
  ArrowLeft,
  BookmarkSimple,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLineLeft,
  CaretLineRight,
  FadersHorizontal,
  MagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Salvos',
}
export const dynamic = 'force-dynamic';

async function ComponentSavedTopicFeed() {
  const { data: postsData }: { data: SavedTopicFeed[] } = await fetchAPI({
    url: `${process.env.NEXTAUTH_URL}/api/salvos`,
    method: 'GET',
    next: { tags: ['saved-topic'] },
  })
    .then((res) => res.json())
    .catch(console.error)

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {Array.isArray(postsData) && postsData.length > 0 ? (
        postsData.map((topic) => <Topic key={topic.id} data={topic} />)
      ) : (
        <p className=" col-span-2 py-4 text-center">Nenhum tópico encontrado</p>
      )}
    </div>
  )
}

export default function Salvos() {
  return (
    <main className="rounded-xl bg-stone-950 px-4 py-12">
      <h1 className="flex gap-2 text-3xl font-bold">
        Salvos
        <BookmarkSimple weight="bold" size={36} />
      </h1>

      <section className="grid gap-4 pt-9">
        <div className="flex gap-3">
          <Link href={'/'} className="flex">
            <Button iconLeft={ArrowLeft} state="transparent">
              Voltar
            </Button>
          </Link>
          <div className="flex w-full  gap-3">
            <Input
              state="default"
              placeholder="Buscar um topico"
              withIcon={<MagnifyingGlass size={20} />}
              className="max-w-[418px]"
            />
            <Button>Buscar</Button>
          </div>
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
            <ComponentSavedTopicFeed />
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
  )
}
