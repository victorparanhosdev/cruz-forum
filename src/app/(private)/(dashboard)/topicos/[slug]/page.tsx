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
      className="rounded-xl bg-stone-950 px-4 py-12 "
      role="main"
      aria-labelledby="topic-title"
    >
      <section
        className="mx-auto max-w-[950px] "
        aria-label="Detalhes do Tópico"
      >
        <Link
          href={'/'}
          className="mb-4 inline-flex"
          aria-label="Voltar para página inicial"
        >
          <Button state="transparent" className=" pl-0" iconLeft={ArrowLeft}>
            Voltar
          </Button>
        </Link>

        <div className="mb-4 flex items-center gap-6">
          <Image
            src={response.image ?? '/placeholderperfil.png'}
            alt={`Foto de perfil de ${response.name}`}
            width={128}
            height={128}
            className="size-32 rounded-full object-cover"
            priority
            quality={70}
          />
          <div className="grid w-full gap-2.5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-bold" id="topic-title">
                  {response.title}
                </h1>
                <div className="flex items-center gap-2">
                  <ArrowBendDownLeft size={16} aria-hidden="true" />
                  <span
                    aria-label={`Tópico publicado ${formatDistanceDate(response.createdAt)} por ${response.name}`}
                    className="text-sm text-zinc-500"
                  >
                    topico publicado{' '}
                    <span className="font-semibold">
                      {formatDistanceDate(response.createdAt)}
                    </span>{' '}
                    por{' '}
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
                    <Trash
                      className="text-red-500"
                      size={36}
                      aria-hidden="true"
                    />
                  </AlertDialog>
                ) : (
                  <ButtonSavedTopic
                    isSavedTopic={response.isAuthorSavedTopic}
                    aria-label={`Salvar tópico de ${response.name}`}
                    topicSlug={response.slug}
                  />
                )}
              </div>
            </div>

            <p className="text-base text-zinc-300">{response.descricao}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-4 text-sm" aria-live="polite">
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
