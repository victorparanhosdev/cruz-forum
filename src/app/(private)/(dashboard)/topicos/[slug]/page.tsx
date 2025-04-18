import { Button, ButtonSavedTopic } from '@/components'
import { AlertDialog } from '@/components/AlertDialog'
import {
  ArrowBendDownLeft,
  ArrowLeft,
  Trash,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { CreateComents } from './_components/CreateComents'
import { Metadata } from 'next'
import { fetchAPI } from '@/lib/fetchAPI'
import { revalidateTag } from 'next/cache'
import { Suspense } from 'react'

import { redirect } from 'next/navigation'
import { TopicCommentsProps } from '@/app/api/topics/[slug]/comments/route'
import { CommentSection } from './_components/CommentSection'
import { formatDistanceDate } from '@/lib/formatDistanceDate'

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
  isAuthorSavedTopic: boolean
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
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/${topicSlug}/comments`,
    method: 'POST',
    data: { descricao: comments },
  })

  revalidateTag('comments')
}

async function ComentariosCard({ topicSlug }: { topicSlug: number }) {
  const responseComents: TopicCommentsProps[] = await fetchAPI({
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/${topicSlug}/comments`,
    method: 'GET',
    next: { tags: ['comments'] },
  })
    .then((res) => res.json())
    .catch(console.error)

  return <CommentSection comments={responseComents} />
}

async function handleDeleteTopic(topicSlug: number) {
  'use server'

  try {
    const response = await fetchAPI({
      url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/${topicSlug}/delete`,
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
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/${getParams.slug}`,
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(console.error)

  if ('error' in response && response.error) {
    redirect('/')
  }

  return (
    <main
      className="h-full rounded-none bg-stone-950 px-1.5 pb-12 pt-24 ring-1 ring-stone-900 min-[330px]:px-4 md:rounded-xl md:pb-10 md:pt-12"
      role="main"
      aria-labelledby="topic-title"
    >
      <section
        className="mx-auto max-w-[950px]"
        aria-label="Detalhes do Tópico"
      >
        <Link
          href={'/'}
          className="mb-4 inline-flex"
          aria-label="Voltar para página inicial"
        >
          <Button state="transparent" className="pl-0" iconLeft={ArrowLeft}>
            Voltar
          </Button>
        </Link>

        <div className="mb-4 flex gap-4 md:gap-6">
          <Image
            src={response.image || '/placeholderperfil.png'}
            alt={`Foto de perfil de ${response.name}`}
            width={128}
            height={128}
            className="size-16 min-w-16 rounded-full object-cover md:size-32 md:min-w-32"
            priority
            quality={70}
          />

          <div className="w-full">
            <h1
              className="mb-1.5 font-bold sm:text-xl md:text-2xl lg:text-4xl"
              id="topic-title"
            >
              {response.title}
            </h1>
            <div className="flex items-center gap-2">
              <ArrowBendDownLeft size={16} aria-hidden="true" />
              <span
                aria-label={`Tópico publicado ${formatDistanceDate(response.createdAt)} por ${response.name}`}
                className="text-xs text-zinc-500 md:text-sm"
              >
                topico publicado{' '}
                <span className="font-semibold">
                  {formatDistanceDate(response.createdAt)}
                </span>{' '}
                por <strong className="text-zinc-400">{response.name}</strong>
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
                <Trash
                  className="size-6 text-red-500 md:size-9"
                  aria-hidden="true"
                />
              </AlertDialog>
            ) : (
              <ButtonSavedTopic
                isSavedTopic={response.isAuthorSavedTopic}
                aria-label={`Salvar tópico de ${response.name}`}
                topicSlug={response.slug}
                className="h-fit"
              />
            )}
          </div>
        </div>

        <p className="mb-4 text-justify text-xs text-zinc-300 sm:text-sm md:text-start md:text-base">
          {response.descricao}
        </p>

        <div className="mb-4">
          <p className="mb-4 text-sm underline" aria-live="polite">
            Comentarios:{' '}
          </p>
          <Suspense fallback={<h1>Carregando....</h1>}>
            <ComentariosCard topicSlug={response.slug} />
          </Suspense>
        </div>

        <CreateComents
          onAddComments={handleAddComments}
          topicSlug={response.slug}
        />
      </section>
    </main>
  )
}
