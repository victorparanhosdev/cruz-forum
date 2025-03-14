import Image from 'next/image'
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

        <AuthButtons />
      </section>
    </main>
  )
}
