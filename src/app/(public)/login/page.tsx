import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { Label, Input, Button } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

import { Metadata } from 'next'
import { AuthButtons } from './AuthButtons'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main className="grid min-h-view-without-fill w-full grid-cols-view-login overflow-hidden rounded-xl bg-stone-950">
      <section className="bg-[url(/bg.png)] bg-cover bg-bottom bg-no-repeat" />

      <section className="m-auto flex min-w-[331px] flex-col items-center p-6">
        <Image
          width={256}
          height={104}
          alt="logo da aplicacao"
          src="/logo-login.png"
          className="mb-12 max-w-64"
        />

        <form action="" className="grid w-full gap-4">
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

          <p className='flex w-full items-center gap-2 font-medium before:block before:h-px before:w-full before:bg-stone-700 before:content-[""] after:block after:h-px after:w-full after:bg-stone-700 after:content-[""]'>
            ou
          </p>

          <AuthButtons />
        </form>
      </section>
    </main>
  )
}
