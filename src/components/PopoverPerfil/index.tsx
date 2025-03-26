'use client'
import { Popover, Button } from '@/components'
import { ReactNode } from 'react'
import { SignOut, User } from '@phosphor-icons/react/dist/ssr'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const PopoverPerfil = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  function handleSignOut() {
    signOut()
  }

  function handleNavigationPerfil() {
    router.push('/perfil')
  }
  return (
    <Popover.PopoverRoot positioning={{ sameWidth: true }}>
      <Popover.PopoverTrigger asChild>{children}</Popover.PopoverTrigger>
      <Popover.PopoverContent
        className="rounded-lg border border-gray-900 bg-zinc-950"
        width="auto"
        overflow="hidden"
      >
        <Popover.PopoverBody padding="initial">
          <Button
            state="menu"
            iconLeft={User}
            className="rounded-none"
            onClick={handleNavigationPerfil}
          >
            Perfil
          </Button>

          <div className="h-px w-full bg-gray-900" />

          <Button
            state="menu"
            onClick={handleSignOut}
            iconLeft={SignOut}
            className="rounded-none text-red-500 hover:bg-red-950 hover:text-red-400"
          >
            Sair da conta
          </Button>
        </Popover.PopoverBody>
      </Popover.PopoverContent>
    </Popover.PopoverRoot>
  )
}
