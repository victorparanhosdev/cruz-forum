import { CircleNotch } from '@phosphor-icons/react/dist/ssr'

export default function Loading() {
  return (
    <main className="grid min-h-[100dvh] w-full place-content-center bg-black">
      <div className="flex max-w-60 flex-col items-center space-y-4 text-center">
        <div className="m-auto h-10 w-10">
          <CircleNotch className="h-full w-full animate-spin text-white" />
        </div>
        <p className="text-xs font-medium text-white">
          Estamos preparando tudo para você. Aguarde um instante...
        </p>
      </div>
    </main>
  )
}
