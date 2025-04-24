import { redirect } from 'next/navigation'
import { fetchCardFeed } from './fetchCardFeed'
import { SearchTitleProps } from './page'
import { Topic } from '@/components'
import { Suspense } from 'react'
import { SkeletonTopic } from '@/components/Topic'
import { PaginationControl } from './PaginationControl'

export const SectionFeed = async ({ searchTitle }: SearchTitleProps) => {
  const data = await fetchCardFeed({ searchTitle })

  if (Number(searchTitle?.page) > data.meta.totalPages) {
    redirect('/')
  }

  return (
    <>
      <Suspense fallback={<SkeletonTopic />}>
        <div className="grid grid-cols-1 gap-4 min-[980px]:grid-cols-2">
          {Array.isArray(data.data) && data.data.length > 0 ? (
            data.data.map((topic) => <Topic key={topic.id} data={topic} />)
          ) : (
            <p className="col-span-2 py-4 text-center">
              Nenhum tópico encontrado
            </p>
          )}
        </div>
      </Suspense>
      <PaginationControl data={data} />
    </>
  )
}
