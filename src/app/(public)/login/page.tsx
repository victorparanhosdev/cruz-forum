import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { Label, Input, Button } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
  return (
    <main className="bg-stone-950 grid grid-cols-view-login rounded-xl overflow-hidden w-full min-h-view-without-fill">
      <section className="bg-[url(/bg.png)] bg-no-repeat bg-bottom bg-cover" />

      <section className="min-w-[331px] p-6 m-auto flex flex-col items-center">
        <Image
          width={256}
          height={104}
          alt="logo da aplicacao"
          src="/logo-login.png"
          className="max-w-64 mb-12"
        />

        <form action="" className="grid gap-4 w-full">
          <div>
            <Label>Entrar com e-mail</Label>
            <Input
              placeholder="victor@email.com"
              state="default"
              withIcon={<EnvelopeSimple size={20} />}
            />
          </div>

          <Link href={'/'}>
            <Button type="button" state="default" className="w-full">
              Continue com seu e-mail
            </Button>
          </Link>

          <p className='flex items-center gap-2 before:block before:content-[""] before:w-full before:h-px before:bg-stone-700 after:content-[""] after:block after:w-full after:h-px after:bg-stone-700 w-full font-medium'>
            ou
          </p>

          <div className="grid gap-3">
            <button
              type="button"
              className="py-1 px-6 hover:enabled:bg-hover-btn-gray transition flex items-center gap-3 border border-stone-700 rounded-lg"
            >
              <Image
                alt="google"
                height={49}
                width={48}
                src="/google.svg"
                className="object-cover"
              />
              Fazer login com o Google
            </button>
            <button
              type="button"
              className="py-1 px-6 hover:enabled:bg-hover-btn-gray transition flex items-center gap-3 border border-stone-700 rounded-lg"
            >
              <Image
                alt="facebook"
                height={49}
                width={48}
                src="/facebook.svg"
                className="object-cover"
              />
              Fazer login com o Facebook
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
