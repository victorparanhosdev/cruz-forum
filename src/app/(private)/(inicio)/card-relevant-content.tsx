import { Skeleton } from '@chakra-ui/react/skeleton'
import { AsideRelevant } from './aside-card-relevant'
import { StarFour } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

export type CardRelevantProps = {
  id: string
  title: string
  image: string
  slug: number
  lastCommentAt: string
}

interface AsideSkeletonProps extends React.HTMLAttributes<HTMLElement> {}

export function AsideRelevantesSkeleton({
  className,
  ...props
}: AsideSkeletonProps) {
  return (
    <aside
      {...props}
      className={cn(
        'h-view-relevantes fixed bottom-4 right-4 top-4 w-[257px] overflow-auto rounded-xl bg-stone-950 px-4 pt-12 ring-1 ring-stone-900',
        className,
      )}
    >
      <h2 className="mb-8 flex items-center gap-1 text-sm text-stone-300">
        <StarFour size={16} /> Mais Relevantes
      </h2>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton asChild key={index}>
            <div className="flex min-h-24 cursor-pointer gap-2.5 rounded-lg border border-stone-700 bg-stone-800 px-3 py-2" />
          </Skeleton>
        ))}
      </div>
    </aside>
  )
}

export const CardRelevantContent = async () => {
  const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/relevant`

  const data: CardRelevantProps[] = await fetch(url, {
    next: { tags: ['feed'] },
  })
    .then((res) => res.json())
    .catch(console.error)

  return <AsideRelevant data={data} />
}
