import Image from 'next/image'
import { Metadata } from 'next'
import { AuthButtons } from './AuthButtons'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <main className="flex w-full grid-cols-view-login bg-stone-950 md:grid md:rounded-xl">
      <section className="hidden bg-[url(/bg.png)] bg-cover bg-bottom bg-no-repeat md:block" />

      <section className="flex w-full flex-col items-center justify-center p-4 md:py-12 apple:w-auto apple:m-auto md:p-6">
        <Image
          width={256}
          height={104}
          alt="logo da aplicacao"
          src="/logo-login.png"
          className="mb-12 max-w-52"
          priority
          quality={60}
        />

        <AuthButtons />
      </section>
    </main>
  )
}
