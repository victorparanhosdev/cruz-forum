import { PerfilProps } from '@/app/api/perfil/route'
import { fetchAPI } from '@/lib/fetchAPI'
import { User } from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'

import { PerfilForm } from './PerfilForm'

export const metadata: Metadata = {
  title: 'Perfil',
}

export default async function Perfil() {
  const response = await fetchAPI({
    url: `${process.env.NEXTAUTH_URL}/api/perfil`,
  })

  const data: PerfilProps = await response.json()

  function formatCount(
    count: number,
    singular: string,
    plural: string,
    none: string,
  ) {
    if (count === 0) return none
    if (count === 1) return `1 ${singular}`
    return `${count} ${plural}`
  }

  const topicsText = formatCount(
    data.quantityTopics,
    'Tópico publicado',
    'Tópicos publicados',
    'Nenhum tópico publicado',
  )
  const commentsText = formatCount(
    data.quantityComments,
    'comentário',
    'comentários',
    'Nenhum comentário',
  )
  const savedTopicsText = formatCount(
    data.quantitySavedTopics,
    'Tópico salvo',
    'Tópicos salvos',
    'Nenhum tópico salvo',
  )

  return (
    <main className="h-auto w-full rounded-none bg-stone-950 px-1.5 pt-24 ring-1 ring-stone-900 min-[330px]:px-4 md:rounded-xl md:pt-12">
      <h1 className="flex items-center gap-2 text-2xl font-bold md:mb-9 md:text-3xl">
        Perfil <User weight="bold" className="size-6 md:size-9" />
      </h1>

      <PerfilForm
        topicsText={topicsText}
        commentsText={commentsText}
        savedTopicsText={savedTopicsText}
        data={data}
      />
    </main>
  )
}
