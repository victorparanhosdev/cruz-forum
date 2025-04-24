'use client'

import { useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretDoubleRight,
} from '@phosphor-icons/react'
import { TopicWithPaginationProps } from '@/app/api/topics/route'

const PaginationSkeleton = () => (
  <div className="flex place-content-end items-center gap-2 pb-12">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="h-7 w-7 animate-pulse rounded bg-stone-800" />
    ))}
  </div>
)

export const PaginationControl = ({
  data,
}: {
  data: TopicWithPaginationProps
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  )
  const currentPage = Number(params.get('page')) || 1

  if (!data) return <PaginationSkeleton />

  const { totalPages } = data.meta

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const isPaginationDisabled = totalPages === 0

  const updatePage = (page: number) => {
    params.set('page', page.toString())
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const createButton = (
    label: string,
    onClick: () => void,
    disabled: boolean,
    icon: React.ReactNode,
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="disabled:opacity-50"
    >
      {icon}
    </button>
  )

  return (
    <div className="flex place-content-end items-center gap-2 pb-14">
      {createButton(
        'Ir para a primeira página',
        () => updatePage(1),
        isFirstPage || isPaginationDisabled,
        <CaretDoubleLeft size={30} weight="bold" />,
      )}
      {createButton(
        'Página anterior',
        () => updatePage(Math.max(currentPage - 1, 1)),
        isFirstPage || isPaginationDisabled,
        <CaretLeft size={30} weight="bold" />,
      )}
      {createButton(
        'Próxima página',
        () => updatePage(Math.min(currentPage + 1, totalPages)),
        isLastPage || isPaginationDisabled,
        <CaretRight size={30} weight="bold" />,
      )}
      {createButton(
        'Ir para a última página',
        () => updatePage(totalPages),
        isLastPage || isPaginationDisabled,
        <CaretDoubleRight size={30} weight="bold" />,
      )}
    </div>
  )
}
