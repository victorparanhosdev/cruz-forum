import { ArrowBendDownLeft, Heart, Trash } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
export const Comentarios = () => {
  return (
    <div className="p-4 bg-topico-200 rounded-lg grid gap-4 border border-stone-900">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Image
            width={48}
            height={48}
            src="https://github.com/victorparanhosdev.png"
            alt=""
            className="object-cover w-12 h-12 rounded-full"
          />

          <div>
            <h2>Victor Paranhos</h2>
            <div className="flex items-center gap-1">
              <ArrowBendDownLeft size={16} />
              <span className="text-zinc-500 text-xs">
                topico publicado{' '}
                <strong className="font-semibold">há 5 dias</strong>{' '}
              </span>
            </div>
          </div>
        </div>

        <button>
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

      <button className="text-sm flex gap-2 items-center">
        <Heart size={24} />
        06 curtidas
      </button>
    </div>
  )
}
