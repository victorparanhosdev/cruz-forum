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
        'grid gap-4 rounded-lg border border-stone-900 bg-topico-200 p-4 h-max',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Image
            width={48}
            height={48}
            src={dataComment.image || '/placeholderperfil.png'}
            alt="Foto do perfil"
            className="size-12 rounded-full object-cover"
            quality={50}
          />

          <div>
            <h2>{dataComment.name}</h2>
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
              <Trash className="text-red-500" size={28} />
            </button>
          </AlertDialogDeleteComment>
        )}
      </div>

      <p className="break-words break-all text-base text-zinc-300">
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
