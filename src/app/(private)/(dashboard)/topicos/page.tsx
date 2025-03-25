import { TopicFeed } from '@/app/api/topics/route'
import { Button, FilterPopover, Input, Topic } from '@/components'
import {
  ArrowLeft,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLineLeft,
  CaretLineRight,
  FadersHorizontal,
  ListDashes,
  MagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meus Topicos',
}

export default function Topicos() {
  const postsData: TopicFeed[] = [
    {
      id: 'post-001',
      title: 'Como melhorar sua produtividade',
      descricao: 'Dicas e truques para aumentar sua produtividade no dia a dia',
      userId: 'user-123',
      createdAt: new Date('2025-02-15T10:30:00Z'),
      updatedAt: new Date('2025-02-15T14:45:00Z'),
      likes: 42,
      comments: 7,
      image: null,
      isAuthorTopic: false,
      slug: 10,
    },
    {
      id: 'post-002',
      title: 'Receita de bolo de chocolate vegano',
      descricao:
        'Uma deliciosa receita de bolo de chocolate sem ingredientes de origem animal',
      userId: 'user-456',
      createdAt: new Date('2025-03-01T08:15:00Z'),
      updatedAt: new Date('2025-03-01T08:15:00Z'),
      likes: 28,
      comments: 12,
      image: null,
      isAuthorTopic: false,
      slug: 10,
    },
    {
      id: 'post-003',
      title: 'Guia para iniciantes em programação',
      descricao: 'Tudo o que você precisa saber para começar a programar',
      userId: 'user-789',
      createdAt: new Date('2025-03-10T16:20:00Z'),
      updatedAt: new Date('2025-03-12T11:05:00Z'),
      likes: 105,
      comments: 23,
      image: null,
      isAuthorTopic: false,
      slug: 10,
    },
    {
      id: 'post-004',
      title: 'Os melhores destinos para viajar em 2025',
      descricao: 'Conheça os lugares mais incríveis para visitar este ano',
      userId: 'user-123',
      createdAt: new Date('2025-01-05T12:00:00Z'),
      updatedAt: new Date('2025-01-07T09:30:00Z'),
      likes: 87,
      comments: 15,
      image: null,
      isAuthorTopic: false,
      slug: 10,
    },
    {
      id: 'post-005',
      title: 'Meditação para iniciantes',
      descricao:
        'Aprenda técnicas simples de meditação para reduzir o estresse',
      userId: 'user-456',
      createdAt: new Date('2025-03-18T07:45:00Z'),
      updatedAt: new Date('2025-03-18T07:45:00Z'),
      likes: 36,
      comments: 8,
      image: null,
      isAuthorTopic: false,
      slug: 10,
    },
  ]

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
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {postsData.map((topic, index) => {
              return <Topic key={index} data={topic} />
            })}
          </div>

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
