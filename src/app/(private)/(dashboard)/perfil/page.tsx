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
    <main className="rounded-xl bg-stone-950 px-4 py-12 ">
      <h1 className="mb-9 flex gap-2 text-3xl font-bold">
        Perfil <User weight="bold" size={36} />
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
