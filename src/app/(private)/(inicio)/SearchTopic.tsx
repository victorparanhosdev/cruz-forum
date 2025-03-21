'use client'
import { Button, Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function SearchTopic() {
  const paramsURL = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = useMemo(() => new URLSearchParams(paramsURL), [paramsURL])

  const SchemaFormSearchTopic = z.object({
    title: z.string(),
  })

  type SchemaFormSearchTopicProps = z.infer<typeof SchemaFormSearchTopic>

  const { handleSubmit, register } = useForm<SchemaFormSearchTopicProps>({
    resolver: zodResolver(SchemaFormSearchTopic),
    defaultValues: {
      title: '',
    },
  })

  async function handleSearchTopic({ title }: SchemaFormSearchTopicProps) {
    params.set('title', title)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchTopic)}
      className="flex w-full gap-3"
    >
      <Input
        state="default"
        placeholder="Buscar um topico"
        withIcon={<MagnifyingGlass size={20} />}
        {...register('title')}
      />
      <Button type="submit">Buscar</Button>
    </form>
  )
}
