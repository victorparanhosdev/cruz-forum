'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ErrorPage = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  let errorMessage: string
  let titleMessage: string
  switch (error) {
    case 'Verification':
      errorMessage =
        'O link de verificação expirou. Por favor, tente novamente.'
      titleMessage = 'de Autenticação'
      break
    case 'Configuration':
      errorMessage =
        'Houve um problema com a configuração. Por favor, verifique suas credenciais.'
      titleMessage = 'de Configuração'
      break
    default:
      titleMessage = 'Inesperado'
      errorMessage = 'Um erro inesperado ocorreu.'
      break
  }

  return (
    <main className="grid min-h-[100dvh] w-full place-content-center bg-black">
      <div className="min-w-[300px] rounded-lg bg-stone-950 p-4">
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Erro {titleMessage}{' '}
        </h1>
        <p className="text-center text-sm">{errorMessage}</p>

        <div className="flex justify-center">
          <Link
            href={'/'}
            className="mt-4 rounded-lg bg-stone-500 px-10 py-2 text-black transition-colors hover:bg-stone-600 hover:text-stone-200"
          >
            Voltar
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
