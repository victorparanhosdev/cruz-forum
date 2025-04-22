import { TopicCommentsProps } from '@/app/api/topics/[slug]/comments/route'
import { ArrowBendDownLeft, Trash } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { AlertDialogDeleteComment } from '../AlertDialogDeleteComment'
import { formatDistanceDate } from '@/lib/formatDistanceDate'

import { ButtonLikeComment } from '../ButtonLikeComment'

interface ComentariosProps extends ComponentProps<'div'> {
  dataComment: TopicCommentsProps
}

export const Comentarios = ({
  dataComment,
  className,
  ...props
}: ComentariosProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'grid h-max gap-4 rounded-lg border border-stone-900 bg-topico-200 p-4',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Image
            width={48}
            height={48}
            src={dataComment.image || '/placeholderperfil.png'}
            alt="Foto do perfil"
            className="size-10 min-w-10 rounded-full object-cover md:size-12 md:min-w-12"
            quality={50}
          />

          <div>
            <h2 className="text-base">{dataComment.name}</h2>
            <div className="flex items-center gap-1">
              <ArrowBendDownLeft size={16} />
              <span className="text-xs text-zinc-500">
                comentário publicado{' '}
                <strong className="font-semibold">
                  {formatDistanceDate(dataComment.createdAt)}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {dataComment.isAuthorComment && (
          <AlertDialogDeleteComment asChild commentId={dataComment.id}>
            <button aria-label="Excluir o comentario">
              <Trash className="text-red-500" size={24} />
            </button>
          </AlertDialogDeleteComment>
        )}
      </div>

      <p className="break-words break-all text-xs text-zinc-300 sm:text-sm md:text-base">
        {dataComment.descricao}
      </p>

      <ButtonLikeComment
        commentId={dataComment.id}
        isLike={dataComment.isAuthorLikeComment}
        likes={dataComment.likes}
      />
    </div>
  )
}
