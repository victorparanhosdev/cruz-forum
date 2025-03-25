import { TopicFeed } from '@/app/api/topics/route'
import {
  ArrowBendDownLeft,
  BookmarkSimple,
  ChatCircle,
  Heart,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Skeleton } from '@chakra-ui/react'

interface TopicProps extends HTMLAttributes<HTMLDivElement> {
  data: TopicFeed
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

export const Topic = ({ data, className, ...props }: TopicProps) => {
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
            src={data.image ?? '/placeholderperfil.png'}
            alt=""
            className="size-16 rounded-full object-cover"
          />
          <div className="h-[72px] w-full">
            <h2 className="text-lg font-bold ">{data.title}</h2>
            <span className="flex gap-2 text-xs text-gray-400">
              <ArrowBendDownLeft size={14} /> publicado há 5 minutos atras
            </span>
          </div>
        </div>
        {!data.isAuthorTopic && (
          <button aria-label="Botao para salvar o topico">
            <BookmarkSimple size={28} />
          </button>
        )}
      </div>

      <p className="line-clamp-3 h-12 w-full text-xs text-gray-100">
        {data.descricao}
      </p>

      <div className="flex items-center gap-6 text-sm">
        <button
          aria-label="Botao de curtir"
          className="flex items-center gap-2"
        >
          <Heart size={20} /> {data.likes} curtidas
        </button>
        <Link href={`/topicos/${data.slug}`}>
          <button
            aria-label="Botao de comentar"
            className="flex items-center gap-2"
          >
            <ChatCircle size={20} /> {data.comments} comentarios
          </button>
        </Link>
      </div>
    </div>
  )
}
