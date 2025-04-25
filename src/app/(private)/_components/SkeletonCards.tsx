import { SkeletonTopic } from '@/components/Topic'
import { SkeletonButtonPagination } from './PaginationControl'

export const SkeletonCards = () => {
  return (
    <>
      <SkeletonTopic />
      <SkeletonButtonPagination />
    </>
  )
}
