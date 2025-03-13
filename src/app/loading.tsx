import { CircleNotch } from '@phosphor-icons/react/dist/ssr'

export default function Loading() {
  return (
    <main className="min-h-screen grid place-content-center bg-slate-950">
      <div className="max-w-60 text-center space-y-4 flex flex-col items-center">
        <div className="w-10 h-10 m-auto">
          <CircleNotch className="animate-spin h-full w-full text-white" />
        </div>
        <p className="text-xs text-white font-medium">
          Estamos preparando tudo para você. Aguarde um instante...
        </p>
      </div>
    </main>
  )
}
