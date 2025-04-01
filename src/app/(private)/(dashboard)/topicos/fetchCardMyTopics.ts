import { fetchAPI } from '@/lib/fetchAPI'
import { cache } from 'react'
import { SearchTitleProps } from '../../(inicio)/page'
import { TopicSavedFeedWithPaginationProps } from '@/app/api/salvos/route'

export const fetchCardMyTopics = cache(
  async ({
    searchTitle,
  }: SearchTitleProps): Promise<TopicSavedFeedWithPaginationProps> => {
    const hasFilters = searchTitle && Object.keys(searchTitle).length > 0

    let url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/mytopics`

    if (hasFilters) {
      const queryParams = new URLSearchParams()
      if (searchTitle?.q) queryParams.set('q', searchTitle.q)
      if (searchTitle?._sort) queryParams.set('_sort', searchTitle._sort)
      if (searchTitle?.page) queryParams.set('page', searchTitle.page)
      url += `?${queryParams.toString()}`
    }

    const response = await fetchAPI({
      url,
      method: 'GET',
      next: { tags: ['mytopics'] },
    })

    if (!response.ok) {
      console.error(`Erro ao buscar meus tópicos: ${response.statusText}`)
      return
    }

    const data: TopicSavedFeedWithPaginationProps = await response.json()
    return data
  },
)
