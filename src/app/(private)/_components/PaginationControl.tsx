'use client'
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const SkeletonButtonPagination = () => (
  <div className="flex place-content-end items-center gap-2 pb-14">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="h-[30px] w-[30px] animate-pulse rounded bg-stone-800"
      />
    ))}
  </div>
)

export interface PaginationControlProps {
  currentPage: number
  perPage: number
  totalItems: number
  totalPages: number
}

export const PaginationControl = ({
  metaPage,
}: {
  metaPage: PaginationControlProps
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  )
  const currentPage = Number(params.get('page')) || 1

  const { totalPages } = metaPage

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
