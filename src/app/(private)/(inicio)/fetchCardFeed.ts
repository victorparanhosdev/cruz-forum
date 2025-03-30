import { TopicWithPaginationProps } from '@/app/api/topics/route'
import { fetchAPI } from '@/lib/fetchAPI'
import { cache } from 'react'
import { SearchTitleProps } from './page'

export const fetchCardFeed = cache(
  async ({
    searchTitle,
  }: SearchTitleProps): Promise<TopicWithPaginationProps> => {
    const hasFilters = searchTitle && Object.keys(searchTitle).length > 0

    let url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics`

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
      next: { tags: ['feed'] },
    })

    if (!response.ok) {
      console.error(`Erro ao buscar tópicos: ${response.statusText}`)
      return
    }

    const data: TopicWithPaginationProps = await response.json()
    return data
  },
)
