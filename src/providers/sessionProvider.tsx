'use client'
import { SessionProvider as SessionProviderReact } from 'next-auth/react'
import { ReactNode } from 'react'

export function SessionProviderNextAuth({ children }: { children: ReactNode }) {
  return <SessionProviderReact>{children}</SessionProviderReact>
}
