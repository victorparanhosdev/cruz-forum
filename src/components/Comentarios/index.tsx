import { ArrowBendDownLeft, Heart, Trash } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export const Comentarios = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={twMerge(
        'grid gap-4 rounded-lg border border-stone-900 bg-topico-200 p-4',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Image
            width={48}
            height={48}
            src="https://github.com/victorparanhosdev.png"
            alt=""
            className="size-12 rounded-full object-cover"
          />

          <div>
            <h2>Victor Paranhos</h2>
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

      <p className="text-base text-zinc-300">
        exemplo de descrição exemplo de descriexemplo de descrição exemplo de
        descriexemplo de descrição exemplo de descriexemplo de descrição exemplo
        de descriexemplo de descrição exemplo de descriexemplo de descrição
        exemplo de descriexemplo de descrição exemplo de do de descrição exemplo
        de descriexemplo de descrasdsadsdd
      </p>

      <button
        aria-label="Curtir Comentario"
        className="flex items-center gap-2 text-sm"
      >
        <Heart size={24} />
        06 curtidas
      </button>
    </div>
  )
}
