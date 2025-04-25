import { redirect } from 'next/navigation'

import { SearchTitleProps } from '../../(inicio)/page'
import { PaginationControl } from '../../_components/PaginationControl'
import { fetchCardSalvos } from './fetchCardSalvos'
import { Topic } from '@/components'

export const SectionSalvos = async ({ searchTitle }: SearchTitleProps) => {
  const { data: postsData, meta } = await fetchCardSalvos({ searchTitle })

  if (Number(searchTitle?.page) > meta.totalPages) {
    redirect('/salvos')
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 min-[980px]:grid-cols-2">
        {Array.isArray(postsData) && postsData.length > 0 ? (
          postsData.map((topic) => <Topic key={topic.id} data={topic} />)
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
