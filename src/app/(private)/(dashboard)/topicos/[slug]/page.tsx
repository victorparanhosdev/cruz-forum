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
import { Suspense } from 'react'
import { TopicCommentsProps } from '@/app/api/topics/[slug]/comments/route'

export const metadata: Metadata = {
  title: 'Topico',
}

interface TopicIdProps {
  id: string
  title: string
  descricao: string
  userId: string
  createdAt: string
  updatedAt: string
  slug: number
  image: string
  name: string
  isAuthorTopic: boolean
}

async function handleAddComments({
  comments,
  topicSlug,
}: {
  comments: string
  topicSlug: number
}) {
  'use server'

  await fetchAPI({
    url: `http://localhost:3000/api/topics/${topicSlug}/comments`,
    method: 'POST',
    data: { descricao: comments },
  })

  revalidateTag('comments')
}

async function ComentariosCard({ topicSlug }: { topicSlug: number }) {
  const responseComents: TopicCommentsProps[] = await fetchAPI({
    url: `http://localhost:3000/api/topics/${topicSlug}/comments`,
    method: 'GET',
    next: { tags: ['comments'] },
  })
    .then((res) => res.json())
    .catch(console.error)

  return (
    <div className="grid max-h-[474px] gap-4 overflow-auto">
      {Array.isArray(responseComents) && responseComents.length > 0 ? (
        responseComents.map((comment) => {
          return <Comentarios key={comment.id} dataComment={comment} />
        })
      ) : (
        <div className="grid min-h-[162px] place-items-center rounded-lg border border-stone-900 p-4">
          <h1>Nenhuma comentario por enquanto</h1>
        </div>
      )}
    </div>
  )
}

async function handleDeleteTopic(topicSlug: number) {
  'use server'

  try {
    const response = await fetchAPI({
      url: `http://localhost:3000/api/topics/${topicSlug}/delete`,
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.log('Erro:', errorData)
      return errorData
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log('Deu errado:', error)
    return { error: 'Erro desconhecido ao excluir o tópico.' }
  }
}

export default async function TopicId({ params }) {
  const getParams = await params

  const response: TopicIdProps = await fetchAPI({
    url: `http://localhost:3000/api/topics/${getParams.slug}`,
    method: 'GET',
  })
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
            priority
          />
          <div className="grid w-full gap-2.5">
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
                {response.isAuthorTopic ? (
                  <AlertDialog
                    onDeleteTopic={handleDeleteTopic}
                    topicSlug={response.slug}
                    aria-label="Excluir o topico"
                  >
                    <Trash className="text-red-500" size={36} />
                  </AlertDialog>
                ) : (
                  <button aria-label="Botao de Salvar">
                    <BookmarkSimple className="text-white" size={36} />
                  </button>
                )}
              </div>
            </div>

            <p className="text-base text-zinc-300">{response.descricao}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-4 text-sm">Comentarios: </p>
          <Suspense fallback={<h1>Carregando....</h1>}>
            <ComentariosCard topicSlug={response.slug} />
          </Suspense>
        </div>

        <CommentForm
          onAddComments={handleAddComments}
          topicSlug={response.slug}
        />
      </section>
    </main>
  )
}
