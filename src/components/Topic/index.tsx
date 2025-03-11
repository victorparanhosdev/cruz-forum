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

interface TopicProps extends HTMLAttributes<HTMLDivElement> {
  topicId: string
}

export const Topic = ({ topicId, className, ...props }: TopicProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'grid gap-4 rounded-xl border border-stone-700 bg-topico-200 px-6 py-4 transition-colors hover:bg-topico-100',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Image
            height={64}
            width={64}
            src="https://github.com/victorparanhosdev.png"
            alt=""
            className="size-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">Titulo do Topico</h2>
            <span className="flex gap-2 text-xs text-gray-400">
              {' '}
              <ArrowBendDownLeft size={14} /> publicado há 5 minutos atras
            </span>
          </div>
        </div>
        <button aria-label="Botao para salvar o topico">
          <BookmarkSimple size={28} />
        </button>
      </div>

      <p className="line-clamp-3 w-full text-xs text-gray-100">
        description description description description description description
        description description description description description description
        description description.s dsfsfvsfe....
      </p>

      <div className="flex items-center gap-6 text-sm">
        <button
          aria-label="Botao de curtir"
          className="flex items-center gap-2"
        >
          <Heart size={20} /> 6 curtidas
        </button>
        <Link href={`/topicos/${topicId}`}>
          <button
            aria-label="Botao de comentar"
            className="flex items-center gap-2"
          >
            <ChatCircle size={20} /> 15 comentarios
          </button>
        </Link>
      </div>
    </div>
  )
}
