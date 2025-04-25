import { redirect } from 'next/navigation'
import { fetchCardMyTopics } from './fetchCardMyTopics'
import { TopicMyTopic } from './TopicMyTopics'
import { SearchTitleProps } from '../../(inicio)/page'
import { PaginationControl } from '../../_components/PaginationControl'

export const SectionTopicos = async ({ searchTitle }: SearchTitleProps) => {
  const { data: postsData, meta } = await fetchCardMyTopics({ searchTitle })

  if (Number(searchTitle?.page) > meta.totalPages) {
    redirect('/topicos')
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 min-[980px]:grid-cols-2">
        {Array.isArray(postsData) && postsData.length > 0 ? (
          postsData.map((topic) => <TopicMyTopic key={topic.id} data={topic} />)
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
