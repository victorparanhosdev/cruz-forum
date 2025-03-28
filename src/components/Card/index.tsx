import { CardRelevantProps } from '@/app/(private)/(inicio)/page'
import { formatDistanceDate } from '@/lib/formatDistanceDate'
import { ArrowBendDownLeft } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  dataCard: CardRelevantProps
}

export const Card = ({ dataCard, className, ...props }: CardProps) => {
  return (
    <Link href={`/topicos/${dataCard.slug}`}>
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
          src={dataCard.image ?? '/placeholderperfil.png'}
          alt="Imagem do perfil"
          className="size-8 rounded-full object-cover"
          quality={40}
        />
        <div>
          <p className="text-sm font-medium">{dataCard.title}</p>
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <ArrowBendDownLeft size={16} /> comentado{' '}
            {formatDistanceDate(dataCard.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  )
}
