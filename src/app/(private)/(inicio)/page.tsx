import { ApiResponse } from '@/app/api/topics/route'
import {
  Button,
  Card,
  Input,
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
  MagnifyingGlass,
  StarFour,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import { Suspense } from 'react'

async function CardFeed() {
  const res = await fetch('http://localhost:3000/api/topics', {
    cache: 'force-cache',
    next: {
      tags: ['feed'],
      revalidate: 60,
    },
  })
  const { data }: ApiResponse = await res.json()

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {data.map((topic) => {
        return <Topic key={topic.id} data={topic} />
      })}
    </div>
  )
}
export const metadata: Metadata = {
  title: 'Feed',
}

async function handleCreateTopicsFeed({
  descricao,
  title,
}: CreateTopicFormData) {
  'use server'
  await fetchAPI({
    url: 'http://localhost:3000/api/topics',
    method: 'POST',
    data: { descricao, title },
  })

  revalidateTag('feed')
}

export default function Inicio() {
  return (
    <div className="grid min-h-view-without-fill w-full grid-cols-view-home gap-6 p-6">
      <Navigation />
      <main className="rounded-xl bg-stone-950 px-4 py-12">
        <h1 className="flex gap-2 text-3xl font-bold">
          Feed <Chats weight="bold" size={36} />
        </h1>

        <section className="grid gap-4 pt-9">
          <div className="flex gap-4">
            <div className="flex w-full  gap-3">
              <Input
                state="default"
                placeholder="Buscar um topico"
                withIcon={<MagnifyingGlass size={20} />}
              />
              <Button>Buscar</Button>
            </div>
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
            <Suspense fallback={<h1>Carregando....</h1>}>
              <CardFeed />
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

        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => {
            return <Card key={index} cardId={String(index)} />
          })}
        </div>
      </aside>
    </div>
  )
}
