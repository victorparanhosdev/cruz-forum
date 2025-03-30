'use client'
import { Popover } from '@/components'
import { ReactNode, useMemo } from 'react'
import {
  CaretUpDown,
  ChatTeardropText,
  Heart,
  StarFour,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CaretDown, CaretUp, Trash } from '@phosphor-icons/react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const SchemaFilterFormValues = z.object({
  _sort: z.string().nullable(),
})

type SchemaFilterFormValuesProps = z.infer<typeof SchemaFilterFormValues>

export const FilterPopover = ({ children }: { children: ReactNode }) => {
  const paramsURL = useSearchParams()
  const params = useMemo(() => new URLSearchParams(paramsURL), [paramsURL])
  const pathname = usePathname()
  const router = useRouter()
  const getParams = params.get('_sort')
  const AZTopic = getParams === 'topic'

  const { control, reset, setValue } = useForm<SchemaFilterFormValuesProps>({
    resolver: zodResolver(SchemaFilterFormValues),
    defaultValues: {
      _sort: getParams || null,
    },
  })

  const setFilter = (filter: string | null) => {
    if (filter === 'topic') {
      if (getParams === '-topic') {
        params.set('_sort', 'topic')
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      } else {
        params.set('_sort', '-topic')
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      }

      setValue('_sort', filter)

      return
    }

    if (filter === null) {
      return clearFilter()
    }
    params.set('_sort', filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    setValue('_sort', filter)
  }

  const clearFilter = () => {
    params.delete('_sort')
    reset({ _sort: null })
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Popover.PopoverRoot positioning={{ sameWidth: true }}>
      <Popover.PopoverTrigger asChild>{children}</Popover.PopoverTrigger>
      <Popover.PopoverContent
        className="rounded-lg border border-stone-700 bg-zinc-950"
        overflow="hidden"
        width="fit-content"
      >
        <Popover.PopoverBody padding="initial">
          <Controller
            name="_sort"
            control={control}
            render={({ field }) => (
              <ul className="min-w-48 bg-zinc-950 text-sm">
                {[
                  { key: null, label: 'Recentes', icon: StarFour },
                  { key: 'relevant', label: 'Mais Relevantes', icon: TrendUp },
                  {
                    key: 'comments',
                    label: 'Mais comentados',
                    icon: ChatTeardropText,
                  },
                  { key: 'likes', label: 'Mais curtidos', icon: Heart },
                  {
                    key: 'topic',
                    label: 'Ordenar A-Z',
                    icon:
                      getParams === 'topic'
                        ? CaretUp
                        : getParams === '-topic'
                          ? CaretDown
                          : CaretUpDown,
                  },
                ].map(({ key, label, icon: Icon }) => (
                  <li
                    key={key ?? 'recentes'}
                    data-active={field.value === key}
                    onClick={() => setFilter(key)}
                    className="flex w-full cursor-pointer items-center gap-2.5 whitespace-nowrap px-4 py-2.5 transition hover:bg-hover-btn-menu_card active:text-green-700 data-[active=true]:font-semibold data-[active=true]:text-green-700"
                  >
                    <Icon
                      size={20}
                      weight={field.value === key ? 'bold' : 'regular'}
                    />
                    {label}
                  </li>
                ))}
                <li
                  onClick={clearFilter}
                  className="flex w-full cursor-pointer items-center gap-2.5 whitespace-nowrap px-4 py-2.5 font-semibold text-red-700 transition hover:bg-red-950 hover:text-red-300"
                >
                  <Trash size={20} />
                  Limpar Filtro
                </li>
              </ul>
            )}
          />
        </Popover.PopoverBody>
      </Popover.PopoverContent>
    </Popover.PopoverRoot>
  )
}
