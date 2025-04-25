'use client'
import { Popover, Button } from '@/components'
import { ReactNode, useState } from 'react'
import { SignOut, User } from '@phosphor-icons/react/dist/ssr'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSidebar } from '../ui/sidebar'
import { CircleNotch } from '@phosphor-icons/react'

export const PopoverPerfil = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { open, isMobile, setOpenMobile } = useSidebar()
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    await signOut({ callbackUrl: '/', redirect: true })
  }

  function handleNavigationPerfil() {
    router.push('/perfil')
    if (isMobile) {
      setOpenMobile(false)
    }
    setIsOpenPopover(false)
  }

  return (
    <Popover.PopoverRoot
      positioning={{ sameWidth: open || isMobile }}
      onOpenChange={({ open }) => setIsOpenPopover(open)}
      open={isOpenPopover}
    >
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
            iconLeft={isSigningOut ? CircleNotch : SignOut}
            className={`rounded-none text-red-500 hover:bg-red-950 hover:text-red-400`}
            classNameIcon={`${isSigningOut ? 'animate-spin' : ''}`}
            disabled={isSigningOut}
          >
            {isSigningOut ? 'Saindo...' : 'Sair da conta'}
          </Button>
        </Popover.PopoverBody>
      </Popover.PopoverContent>
    </Popover.PopoverRoot>
  )
}
