import { ArrowBendDownLeft } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export const Card = ({ cardId, className, ...props }: CardProps) => {
  return (
    <Link href={`/topicos/${cardId}`}>
      <div
        {...props}
        className={twMerge(
          'flex cursor-pointer gap-2.5 rounded-lg border border-white px-3 py-2 hover:border-green-200 hover:bg-hover-btn-gray',
          className,
        )}
      >
        <Image
          width={32}
          height={32}
          src="https://github.com/victorparanhosdev.png"
          alt="Imagem do perfil"
          className="size-8 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium">Título do Tópico</p>
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <ArrowBendDownLeft size={16} /> comentado há 6 minutos
          </span>
        </div>
      </div>
    </Link>
  )
}
