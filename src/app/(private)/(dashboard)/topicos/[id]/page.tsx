import { Button, Comentarios } from '@/components'
import { AlertDialog } from '@/components/AlertDialog'
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
    <main className="rounded-xl bg-stone-950 px-4 py-12 ">
      <section className="mx-auto max-w-[950px] ">
        <Link href={'/'} className="mb-4 inline-flex">
          {' '}
          <Button state="transparent" className=" pl-0" iconLeft={ArrowLeft}>
            Voltar
          </Button>
        </Link>

        <div className="mb-4 flex items-center gap-6">
          <Image
            src="https://github.com/victorparanhosdev.png"
            alt="Foto de perfil"
            width={128}
            height={128}
            className="size-32 rounded-full object-cover"
          />
          <div className="grid gap-2.5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-bold">Titulo do Topico</h1>
                <div className="flex items-center gap-2">
                  <ArrowBendDownLeft size={16} />
                  <span className="text-sm text-zinc-500">
                    topico publicado há{' '}
                    <span className="font-semibold">5 dias</span> por{' '}
                    <strong className="text-zinc-400">Lorena Brito</strong>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <AlertDialog>
                  <Trash className="text-red-500" size={36} />
                </AlertDialog>
                <button aria-label="Botao de Salvar">
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

          <div className="grid max-h-[474px] gap-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, index) => {
              return <Comentarios key={index} />
            })}
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Button className="px-6 py-4">Comentar</Button>
        </div>
      </section>
    </main>
  )
}
