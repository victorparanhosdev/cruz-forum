import {
  ArrowBendDownLeft,
  ChatCircle,
  Trash,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { formatDistanceDate } from '@/lib/formatDistanceDate'
import { AlertDialogDeleteMyTopic } from './AlertDialogDeleteMyTopic'
import { fetchAPI } from '@/lib/fetchAPI'
import { MyTopics } from '@/app/api/topics/mytopics/route'
import { revalidateTag } from 'next/cache'
import { ButtonLikeTopic } from '@/components'

interface TopicProps extends HTMLAttributes<HTMLDivElement> {
  data: MyTopics
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
  } finally {
    revalidateTag('mytopics')
  }
}

function formatCommentText(count: number): string {
  if (count === 0) return 'Comentar'
  return count === 1 ? '1 comentário' : `${count} comentários`
}

export const TopicMyTopic = ({ data, className, ...props }: TopicProps) => {
  return (
    <Link
      href={`/topicos/${data.slug}`}
      aria-label={`Abrir o topico ${data.title} com mais detalhes`}
    >
      <div
        {...props}
        className={twMerge(
          'grid h-max min-h-[188px] gap-2 rounded-xl border border-stone-700 bg-topico-200 px-6 py-4 transition-colors hover:bg-topico-100',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <Image
              height={64}
              width={64}
              src={data.image || '/placeholderperfil.png'}
              alt=""
              className="size-14 min-w-14 rounded-full object-cover"
              quality={50}
            />
            <div className="h-[72px] w-full">
              <h2 className="line-clamp-2 text-base font-bold">{data.title}</h2>
              <span className="flex gap-2 text-xs text-gray-400">
                <ArrowBendDownLeft size={14} /> publicado{' '}
                {formatDistanceDate(data.createdAt)}
              </span>
            </div>
          </div>
          {data.isAuthorTopic && (
            <AlertDialogDeleteMyTopic
              onDeleteTopic={handleDeleteTopic}
              topicSlug={data.slug}
            >
              <Trash
                aria-label={`Botão para excluir o topico ${data.title}`}
                className="cursor-pointer text-red-500"
                size={28}
                aria-hidden="true"
              />
            </AlertDialogDeleteMyTopic>
          )}
        </div>

        <p className="line-clamp-2 h-8 w-full text-xs text-gray-100">
          {data.descricao}
        </p>

        <div className="flex items-center gap-6 pt-1.5">
          <ButtonLikeTopic
            isLike={data.isAuthorLikeTopic}
            likes={data.likes}
            topicSlug={data.slug}
          />

          <div className="flex items-center gap-2 py-1 text-xs">
            <ChatCircle size={20} />
            {formatCommentText(data.comments)}
          </div>
        </div>
      </div>
    </Link>
  )
}
