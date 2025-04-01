import {
  ArrowBendDownLeft,
  ChatCircle,
  Trash,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Skeleton } from '@chakra-ui/react'
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

export const SkeletonTopic = () => {
  return (
    <div className="grid min-h-[650px] grid-cols-2 gap-x-6 gap-y-4">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <Skeleton asChild key={index}>
            <div className="grid h-[206px] gap-4 rounded-xl border border-stone-700 bg-topico-200 px-6 py-4 transition-colors hover:bg-topico-100" />
          </Skeleton>
        )
      })}
    </div>
  )
}

export const TopicMyTopic = ({ data, className, ...props }: TopicProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'grid gap-4 rounded-xl border border-stone-700 bg-topico-200 px-6 py-4 transition-colors hover:bg-topico-100 min-h-[206px] h-max',
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
            className="size-16 rounded-full object-cover"
            quality={50}
          />
          <div className="h-[72px] w-full">
            <h2 className="text-lg font-bold ">{data.title}</h2>
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
              size={36}
              aria-hidden="true"
            />
          </AlertDialogDeleteMyTopic>
        )}
      </div>

      <p className="line-clamp-3 h-12 w-full text-xs text-gray-100">
        {data.descricao}
      </p>

      <div className="flex items-center gap-6 text-sm">
        <ButtonLikeTopic
          isLike={data.isAuthorLikeTopic}
          likes={data.likes}
          topicSlug={data.slug}
        />
        <Link
          href={`/topicos/${data.slug}`}
          aria-label="Botao de comentar"
          className="flex items-center gap-2"
        >
          <ChatCircle size={20} /> {data.comments} comentarios
        </Link>
      </div>
    </div>
  )
}
