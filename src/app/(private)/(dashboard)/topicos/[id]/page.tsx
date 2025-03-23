import { Button, Comentarios } from '@/components'
import { AlertDialog } from '@/components/AlertDialog'
import {
  ArrowBendDownLeft,
  ArrowLeft,
  BookmarkSimple,
  Trash,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { CommentForm } from './CreateComents'
import { Metadata } from 'next'
import { fetchAPI } from '@/lib/fetchAPI'
import { revalidateTag } from 'next/cache'

export const metadata: Metadata = {
  title: 'Topico',
}

export interface AllCommentsTopic {
  id: string
  descricao: string
  userId: string
  topicId: string
  createdAt: string
  updatedAt: string
  image: string
  name: string
  likes: number
}

export interface TopicWithAllComents {
  id: string
  title: string
  descricao: string
  userId: string
  createdAt: string
  updatedAt: string
  comments: AllCommentsTopic[]
  image: string
  name: string
}
async function handleAddComments({
  comments,
  topicId,
}: {
  comments: string
  topicId: string
}) {
  'use server'

  await fetchAPI({
    url: `http://localhost:3000/api/comments/${topicId}`,
    method: 'POST',
    data: { descricao: comments },
  })

  revalidateTag('topic-comments')
}

export default async function TopicId({ params }) {
  const getParams = await params

  const response: TopicWithAllComents = await fetch(
    `http://localhost:3000/api/comments/${getParams.id}`,
    {
      next: {
        tags: ['topic-comments'],
      },
    },
  )
    .then((res) => res.json())
    .catch(console.error)

  return (
    <main className="rounded-xl bg-stone-950 px-4 py-12 ">
      <section className="mx-auto max-w-[950px] ">
        <Link href={'/'} className="mb-4 inline-flex">
          <Button state="transparent" className=" pl-0" iconLeft={ArrowLeft}>
            Voltar
          </Button>
        </Link>

        <div className="mb-4 flex items-center gap-6">
          <Image
            src={response.image ?? '/placeholderperfil.png'}
            alt="Foto de perfil"
            width={128}
            height={128}
            className="size-32 rounded-full object-cover"
          />
          <div className="grid gap-2.5 w-full">
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-bold">{response.title}</h1>
                <div className="flex items-center gap-2">
                  <ArrowBendDownLeft size={16} />
                  <span className="text-sm text-zinc-500">
                    topico publicado há{' '}
                    <span className="font-semibold">5 dias</span> por{' '}
                    <strong className="text-zinc-400">{response.name}</strong>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <AlertDialog aria-label="Excluir o topico">
                  <Trash className="text-red-500" size={36} />
                </AlertDialog>
                <button aria-label="Botao de Salvar">
                  <BookmarkSimple className="text-white" size={36} />
                </button>
              </div>
            </div>

            <p className="text-base text-zinc-300">{response.descricao}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-4 text-sm">Comentarios: </p>

          <div className="grid max-h-[474px] gap-4 overflow-auto">
            {response.comments.length > 0 ? (
              response.comments.map((comment) => {
                return <Comentarios key={comment.id} dataComment={comment} />
              })
            ) : (
              <div className="grid place-items-center border border-stone-900 rounded-lg min-h-[162px] p-4">
                <h1>Nenhuma comentario por enquanto</h1>
              </div>
            )}
          </div>
        </div>

        <CommentForm onAddComments={handleAddComments} topicId={getParams.id} />
      </section>
    </main>
  )
}
