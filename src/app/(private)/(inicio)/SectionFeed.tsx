import { redirect } from 'next/navigation'
import { fetchCardFeed } from './fetchCardFeed'
import { SearchTitleProps } from './page'
import { Topic } from '@/components'
import { PaginationControl } from '../_components/PaginationControl'

export const SectionFeed = async ({ searchTitle }: SearchTitleProps) => {
  const { data, meta } = await fetchCardFeed({ searchTitle })

  if (Number(searchTitle?.page) > meta.totalPages) {
    redirect('/')
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 min-[980px]:grid-cols-2">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((topic) => <Topic key={topic.id} data={topic} />)
        ) : (
          <p className="col-span-2 py-4 text-center">
            Nenhum tópico encontrado
          </p>
        )}
      </div>

      <PaginationControl metaPage={meta} />
    </>
  )
}
