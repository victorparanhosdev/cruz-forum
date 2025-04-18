import Image from 'next/image'
import { Metadata } from 'next'
import { AuthButtons } from './AuthButtons'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main className="m-4 flex min-h-view-without-fill w-full grid-cols-view-login overflow-hidden rounded-xl bg-stone-950 md:grid">
      <section className="hidden bg-[url(/bg.png)] bg-cover bg-bottom bg-no-repeat md:block" />

      <section className="m-auto flex flex-col items-center p-3 max-[320px]:min-w-0 md:min-w-[331px] md:p-6">
        <Image
          width={256}
          height={104}
          alt="logo da aplicacao"
          src="/logo-login.png"
          className="mb-12 max-w-64"
          priority
          quality={60}
        />

        <AuthButtons />
      </section>
    </main>
  )
}
