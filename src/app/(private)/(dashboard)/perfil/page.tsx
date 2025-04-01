import { PerfilProps } from '@/app/api/perfil/route'
import { Button, Input, Label } from '@/components'
import { fetchAPI } from '@/lib/fetchAPI'
import {
  BookmarkSimple,
  ChatCircleDots,
  ChatText,
  User,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import { handleSubmitPerfil } from './handleSubmitPerfil'
import { ImageUploadPreview } from './ImageUploadPreview'


export const metadata: Metadata = {
  title: 'Perfil',
}

export default async function Perfil() {
  const response = await fetchAPI({
    url: `${process.env.NEXTAUTH_URL}/api/perfil`
  })

  const data: PerfilProps = await response.json()

  function formatCount(count: number, singular: string, plural: string, none: string) {
    if (count === 0) return none;
    if (count === 1) return `1 ${singular}`;
    return `${count} ${plural}`;
  }

  const topicsText = formatCount(data.quantityTopics, "Tópico publicado", "Tópicos publicados", "Nenhum tópico publicado");
  const commentsText = formatCount(data.quantityComments, "comentário", "comentários", "Nenhum comentário");
  const savedTopicsText = formatCount(data.quantitySavedTopics, "Tópico salvo", "Tópicos salvos", "Nenhum tópico salvo");

  return (
    <main className="rounded-xl bg-stone-950 px-4 py-12 ">
      <h1 className="mb-9 flex gap-2 text-3xl font-bold">
        Perfil <User weight="bold" size={36} />
      </h1>

      <form action={handleSubmitPerfil} className="flex gap-20 p-6">
        <div className="grid justify-items-center gap-9">
          <ImageUploadPreview defaultImage={data.image} userName={data.name} />

          <div className="text-center">
            <h2 className="whitespace-nowrap text-3xl font-bold">
              {data.name}
            </h2>
            <p className="text-sm text-gray-400">{data.email}</p>
          </div>

          <ul className="grid gap-4">
            <li className="flex items-center gap-2 px-4 py-1">
              <ChatText size={24} /> {topicsText}
            </li>
            <li className="flex items-center gap-2 px-4 py-1">
              <ChatCircleDots size={24} /> {commentsText}
            </li>
            <li className="flex items-center gap-2 px-4 py-1">
              <BookmarkSimple size={24} />{savedTopicsText}
            </li>
          </ul>
        </div>
        <div className="min-h-full w-px bg-gray-800" />

        <div className="flex flex-col gap-9">
          <h2 className="text-2xl font-medium">Alterar Dados: </h2>

          <div className="grid gap-4">
            <div>
              <Label>Nome:</Label>
              <Input
                type="text"
                placeholder="Escreva seu nome"
                state="default"
                defaultValue={data.name}
                name='name'
              />
            </div>
            <div>
              <Label>Email:</Label>
              <Input
                type="email"
                placeholder="email@email.com"
                state="default"
                disabled
                defaultValue={data.email}
              />
            </div>
          </div>

          <div className="grid grid-flow-col gap-2">
            <Button type="button" className="w-full" state="outline-negative">
              Cancelar
            </Button>

            <Button type="submit" className="w-full">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}