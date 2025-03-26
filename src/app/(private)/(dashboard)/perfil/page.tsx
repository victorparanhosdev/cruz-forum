import { Button, Input, Label } from '@/components'
import {
  BookmarkSimple,
  ChatCircleDots,
  ChatText,
  PencilSimpleLine,
  User,
} from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Perfil',
}

export default function Perfil() {
  return (
    <main className="rounded-xl bg-stone-950 px-4 py-12 ">
      <h1 className="mb-9 flex gap-2 text-3xl font-bold">
        Perfil <User weight="bold" size={36} />
      </h1>

      <div className="flex gap-20 p-6">
        <div className="grid justify-items-center gap-9">
          <div className="relative w-fit">
            <input
              type="file"
              name="upload-photo"
              id="upload-photo"
              className="sr-only"
            />
            <Image
              src="https://github.com/victorparanhosdev.png"
              alt="Foto de perfil"
              width={208}
              height={208}
              className="size-52 rounded-full object-cover"
            />
            <Label
              htmlFor="upload-photo"
              className="absolute bottom-0 right-8 mb-0 flex cursor-pointer items-center rounded-full bg-green-950 p-1.5"
            >
              <PencilSimpleLine
                size={24}
                className="text-green-200"
                weight="fill"
              />
            </Label>
          </div>

          <div className="text-center">
            <h2 className="whitespace-nowrap text-3xl font-bold">
              Victor Paranhos
            </h2>
            <p className="text-sm text-gray-400">victor_paranhos@hotmail.com</p>
          </div>

          <ul className="grid gap-4">
            <li className="flex items-center gap-2 px-4 py-1">
              <ChatText size={24} /> 12 Topicos publicados
            </li>
            <li className="flex items-center gap-2 px-4 py-1">
              <ChatCircleDots size={24} /> 6 comentarios
            </li>
            <li className="flex items-center gap-2 px-4 py-1">
              <BookmarkSimple size={24} />5 Topicos salvos
            </li>
          </ul>
        </div>
        <div className="min-h-full w-px bg-gray-800" />

        <div className="grid gap-9">
          <h2 className="text-2xl font-medium">Alterar Dados: </h2>

          <form action="" className="grid gap-4">
            <div>
              <Label>Nome:</Label>
              <Input
                type="text"
                placeholder="Escreva seu nome"
                state="default"
              />
            </div>
            <div>
              <Label>Email:</Label>
              <Input
                type="email"
                placeholder="email@email.com"
                state="default"
              />
            </div>
            <div>
              <Label>Senha Antiga:</Label>
              <Input type="password" placeholder="*********" state="default" />
            </div>
            <div>
              <Label>Nova senha:</Label>
              <Input type="password" placeholder="*********" state="default" />
            </div>
          </form>

          <div className="grid grid-flow-col gap-2">
            <Button type="button" className="w-full" state="outline-negative">
              Cancelar
            </Button>

            <Button type="button" className="w-full">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
