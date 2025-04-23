import { TopicFeed } from '@/app/api/topics/route'
import { ArrowBendDownLeft, ChatCircle } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Skeleton } from '@chakra-ui/react'
import { formatDistanceDate } from '@/lib/formatDistanceDate'
import { ButtonSavedTopic, ButtonLikeTopic } from '@/components'

interface TopicProps extends HTMLAttributes<HTMLDivElement> {
  data: TopicFeed
}

export const SkeletonTopic = () => {
  return (
    <div className="grid min-h-[596px] grid-cols-1 gap-4 min-[980px]:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <Skeleton asChild key={index}>
            <div className="grid h-[188px] gap-4 rounded-xl border border-stone-700 bg-topico-200 px-6 py-4 transition-colors hover:bg-topico-100" />
          </Skeleton>
        )
      })}
    </div>
  )
}

export const Topic = ({ data, className, ...props }: TopicProps) => {
  function formatCommentText(count: number): string {
    if (count === 0) return 'Comentar'
    return count === 1 ? '1 comentário' : `${count} comentários`
  }

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
          {!data.isAuthorTopic && (
            <ButtonSavedTopic
              aria-label={`Botão para salvar o topico ${data.title}`}
              topicSlug={data.slug}
              isSavedTopic={data.isAuthorSavedTopic}
            />
          )}
        </div>

        <p className="line-clamp-2 h-8 w-full text-xs text-gray-100">
          {data.descricao}
        </p>

        <div className="flex items-center gap-6 pt-1.5">
          <ButtonLikeTopic
            topicSlug={data.slug}
            likes={data.likes}
            isLike={data.isAuthorLikeTopic}
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
