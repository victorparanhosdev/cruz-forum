'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export const AuthButtons = () => {
  return (
    <div className="grid gap-3">
      <button
        onClick={() => signIn('google', { redirect: false, callbackUrl: '/' })}
        type="button"
        className="flex items-center gap-3 rounded-lg border border-stone-700 px-6 py-1 transition hover:enabled:bg-hover-btn-gray"
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
        className="flex items-center gap-3 rounded-lg border border-stone-700 px-6 py-1 transition hover:enabled:bg-hover-btn-gray"
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
  )
}
