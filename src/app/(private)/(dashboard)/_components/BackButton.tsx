'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function BackButton({ className, ...props }: ComponentProps<'button'>) {
  const router = useRouter()

  return (
    <Button
      {...props}
      iconLeft={ArrowLeft}
      onClick={() => router.back()}
      state="transparent"
      aria-label="Voltar para pagina anterior"
      className={cn(className)}
    >
      Voltar
    </Button>
  )
}
