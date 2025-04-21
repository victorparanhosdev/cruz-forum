'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      iconLeft={ArrowLeft}
      onClick={() => router.back()}
      state="transparent"
      aria-label="Voltar para pagina anterior"
    >
      Voltar
    </Button>
  )
}
