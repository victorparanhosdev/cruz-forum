import { Card } from '@/components'
import { cn } from '@/lib/utils'
import { Skeleton } from '@chakra-ui/react/skeleton'
import { StarFour } from '@phosphor-icons/react/dist/ssr'
import { ComponentProps, Suspense } from 'react'

export type CardRelevantProps = {
  id: string
  title: string
  image: string
  slug: number
  lastCommentAt: string
}

const CardRelevantContent = async () => {
  const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/relevant`

  const data: CardRelevantProps[] = await fetch(url, {
    next: { tags: ['feed'] },
  })
    .then((res) => res.json())
    .catch(console.error)

  return (
    <div className="flex flex-col gap-4">
      {data.map((dataCard: CardRelevantProps) => {
        return <Card key={dataCard.id} dataCard={dataCard} />
      })}
    </div>
  )
}

const SkeletonCardRelevantContent = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <Skeleton asChild key={index}>
            <div className="flex min-h-24 cursor-pointer gap-2.5 rounded-lg border border-white bg-topico-200 px-3 py-2 hover:border-green-200 hover:bg-hover-btn-gray" />
          </Skeleton>
        )
      })}
    </div>
  )
}
export const CardRelevantWrapper = () => {
  return (
    <Suspense fallback={<SkeletonCardRelevantContent />}>
      <CardRelevantContent />
    </Suspense>
  )
}

export const Aside = ({ className, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      {...props}
      className={cn(
        'h-view-relevantes fixed bottom-6 right-6 top-6 hidden w-[241px] overflow-auto rounded-xl bg-stone-950 px-4 pt-12 ring-1 ring-stone-900 min-[1280px]:block',
        className,
      )}
    >
      <h2 className="mb-8 flex items-center gap-1 text-sm">
        <StarFour size={16} /> Mais Relevantes
      </h2>

      <CardRelevantWrapper />
    </aside>
  )
}
