import { Button, Comentarios } from '@/components'
import {
  ArrowBendDownLeft,
  ArrowLeft,
  BookmarkSimple,
  Trash,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

export default function Salvos() {
  return (
    <main className="bg-stone-950 rounded-xl px-4 py-12 ">
      <section className="max-w-[950px] mx-auto ">
        <Link href={'/'} className="flex">
          {' '}
          <Button
            state="transparent"
            className="pl-0 mb-4"
            iconLeft={ArrowLeft}
          >
            Voltar
          </Button>
        </Link>

        <div className="flex gap-6 items-center mb-4">
          <Image
            src="https://github.com/victorparanhosdev.png"
            alt="Foto de perfil"
            width={128}
            height={128}
            className="object-cover w-32 h-32 rounded-full"
          />
          <div className="grid gap-2.5">
            <div className="justify-between flex">
              <div>
                <h1 className="text-4xl font-bold">Titulo do Topico</h1>
                <div className="flex items-center gap-2">
                  <ArrowBendDownLeft size={16} />
                  <span className="text-zinc-500 text-sm">
                    topico publicado há{' '}
                    <span className="font-semibold">5 dias</span> por{' '}
                    <strong className="text-zinc-400">Lorena Brito</strong>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button>
                  <Trash className="text-red-500" size={36} />
                </button>
                <button>
                  <BookmarkSimple className="text-white" size={36} />
                </button>
              </div>
            </div>

            <p className="text-base text-zinc-300">
              exemplo de descrição exemplo de descriexemplo de descrição exemplo
              de descriexemplo de descrição exemplo de descriexemplo de
              descrição exemplo de descriexemplo de descrição exemplo de
              descriexemplo de descrição exemplo de descriexemplo de descrição
              exemplo de descriexemplo de descrição exemplo de descriexemplo de
              descrição ex.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-4 text-sm">Comentarios: </p>

          <div className="grid gap-4 max-h-[474px] overflow-auto">
            {Array.from({ length: 10 }).map((_, index) => {
              return <Comentarios key={index} />
            })}
          </div>
        </div>

        <div className="flex justify-end w-full">
          <Button className="py-4 px-6">Comentar</Button>
        </div>
      </section>
    </main>
  )
}
