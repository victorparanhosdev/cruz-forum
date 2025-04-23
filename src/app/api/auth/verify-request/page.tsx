import Link from 'next/link'

export default function VerifyRequest() {
  return (
    <main className="grid min-h-[100dvh] w-full place-content-center bg-black">
      <div className="min-w-[300px] rounded-lg bg-stone-950 p-4">
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Verifique seu e-mail
        </h1>
        <p className="text-center">
          Enviamos um link de login para o seu e-mail. Por favor, verifique sua
          caixa de entrada.
        </p>

        <div className="flex justify-center">
          <Link
            href={'/'}
            className="my-4 rounded-lg bg-stone-500 px-10 py-2 text-black transition-colors hover:bg-stone-600 hover:text-stone-200"
          >
            Ok
          </Link>
        </div>
      </div>
    </main>
  )
}
