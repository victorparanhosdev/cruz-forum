import { AllCommentsTopic } from '@/app/(private)/(dashboard)/topicos/[id]/page'
import { ArrowBendDownLeft, Heart, Trash } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ComentariosProps extends HTMLAttributes<HTMLDivElement> {
  dataComment: AllCommentsTopic
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
            src={dataComment.image ?? '/placeholderperfil.png'}
            alt=""
            className="size-12 rounded-full object-cover"
          />

          <div>
            <h2>{dataComment.name}</h2>
            <div className="flex items-center gap-1">
              <ArrowBendDownLeft size={16} />
              <span className="text-xs text-zinc-500">
                topico publicado
                <strong className="font-semibold">há 5 dias</strong>
              </span>
            </div>
          </div>
        </div>

        <button aria-label="Excluir o comentario">
          <Trash className="text-red-500" size={28} />
        </button>
      </div>

      <p className="text-base text-zinc-300">{dataComment.descricao}</p>

      <button
        aria-label="Curtir Comentario"
        className="flex items-center gap-2 text-sm"
      >
        <Heart size={24} />
        {dataComment.likes} curtidas
      </button>
    </div>
  )
}
