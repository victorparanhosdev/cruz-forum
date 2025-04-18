'use client'
import { Button, Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'

const SchemaFormSearchTopic = z.object({
  title: z.string(),
})

type SchemaFormSearchTopicProps = z.infer<typeof SchemaFormSearchTopic>

export function SearchTopic() {
  const { handleSubmit, register, reset, getValues } =
    useForm<SchemaFormSearchTopicProps>({
      resolver: zodResolver(SchemaFormSearchTopic),
      defaultValues: {
        title: '',
      },
    })
  const paramsURL = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = useMemo(() => new URLSearchParams(paramsURL), [paramsURL])
  const getParamsSearch = params.get('q')

  const clearSearch = () => {
    params.delete('q')
    params.delete('page')
    reset({
      title: '',
    })
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const applyFilter = () => {
    params.set('q', getValues('title'))
    params.delete('page')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  async function handleSearchTopic({ title }: SchemaFormSearchTopicProps) {
    if (!title.trim()) {
      params.delete('q')
      reset()
    } else {
      params.set('q', title)
    }
    params.delete('page')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const isSearch = getValues('title')

  return (
    <form
      onSubmit={handleSubmit(handleSearchTopic)}
      className="flex w-full gap-3"
    >
      <Input
        state="default"
        placeholder="Buscar um topico"
        withIcon={
          isSearch && getParamsSearch ? (
            <X
              size={24}
              className="cursor-pointer text-red-600"
              weight="bold"
              onClick={clearSearch}
              role="button"
              aria-label="Botão para limpar buscas"
            />
          ) : (
            <MagnifyingGlass
              size={20}
              onClick={applyFilter}
              className="cursor-pointer"
              role="button"
              aria-label="Botao para pesquisa"
            />
          )
        }
        {...register('title')}
      />
      <Button
        aria-label="Botão Buscar"
        type="submit"
        className="hidden md:block"
      >
        Buscar
      </Button>
    </form>
  )
}
