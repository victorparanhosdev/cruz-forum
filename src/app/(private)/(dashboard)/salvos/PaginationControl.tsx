'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretDoubleRight,
} from '@phosphor-icons/react'
import { SearchTitleProps } from '../../(inicio)/page'

const PaginationSkeleton = () => {
  return (
    <div className="flex place-content-end items-center gap-2">
      <div className="h-6 w-6 animate-pulse rounded bg-stone-800" />
      <div className="h-6 w-6 animate-pulse rounded bg-stone-800" />
      <div className="h-6 w-6 animate-pulse rounded bg-stone-800" />
      <div className="h-6 w-6 animate-pulse rounded bg-stone-800" />
    </div>
  )
}

export const PaginationControl = ({ searchTitle }: SearchTitleProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  )

  const [data, setData] = useState<{ meta: { totalPages: number } } | null>(
    null,
  )

  const query = params.get('q') || ''
  const currentPage = Number(params.get('page')) || 1

  useEffect(() => {
    async function fetchData() {
      const queryParams = new URLSearchParams()

      if (searchTitle?.q) {
        queryParams.set('q', query)
        queryParams.set('page', currentPage.toString())
      }

      const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/salvos?${queryParams.toString()}`

      const res = await fetch(url)
      const json = await res.json()

      setData(json)
    }

    fetchData()
  }, [query, currentPage, searchTitle?.q])

  const updatePage = (page: number) => {
    params.set('page', page.toString())
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (!data) return <PaginationSkeleton />

  const { meta } = data

  return (
    <div className="flex place-content-end items-center gap-2">
      <button
        onClick={() => updatePage(1)}
        disabled={currentPage === 1 || meta.totalPages === 0}
        aria-label="Ir para a primeira página"
        aria-disabled={currentPage === 1 || meta.totalPages === 0}
        className="disabled:opacity-50"
      >
        <CaretDoubleLeft size={24} />
      </button>
      <button
        onClick={() => updatePage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1 || meta.totalPages === 0}
        aria-label="Página anterior"
        aria-disabled={currentPage === 1 || meta.totalPages === 0}
        className="disabled:opacity-50"
      >
        <CaretLeft size={24} />
      </button>
      <button
        onClick={() => updatePage(Math.min(currentPage + 1, meta.totalPages))}
        disabled={currentPage === meta.totalPages || meta.totalPages === 0}
        aria-label="Próxima página"
        aria-disabled={currentPage === meta.totalPages || meta.totalPages === 0}
        className="disabled:opacity-50"
      >
        <CaretRight size={24} />
      </button>
      <button
        onClick={() => updatePage(meta.totalPages)}
        disabled={currentPage === meta.totalPages || meta.totalPages === 0}
        aria-label="Ir para a última página"
        aria-disabled={currentPage === meta.totalPages || meta.totalPages === 0}
        className="disabled:opacity-50"
      >
        <CaretDoubleRight size={24} />
      </button>
    </div>
  )
}
