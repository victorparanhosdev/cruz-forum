import { Navigation } from '@/components'
import { SidebarTriggerMobile } from '@/components/ui/SidebarTriggerMobile'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <div
        role="navigation"
        className="fixed left-0 right-0 top-0 z-10 flex min-h-16 w-full items-center gap-6 bg-stone-950/95 shadow-lg md:hidden"
      >
        <SidebarTriggerMobile />
        <Link href={'/'}>
          <Image
            width={166}
            height={54}
            src="/logo-home.svg"
            alt="logo da aplicacao"
            className="h-full max-w-[126px]"
            priority
          />
        </Link>
      </div>
      {children}
    </>
  )
}
