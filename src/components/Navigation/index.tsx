'use client'
import { CaretDown } from '@phosphor-icons/react/dist/ssr'
import { PopoverPerfil, Menu } from '@/components'
import Image from 'next/image'

import { Skeleton } from '@chakra-ui/react'

import { useSession } from 'next-auth/react'
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarTrigger,
} from '../ui/sidebar'

export const Navigation = () => {
  const session = useSession()

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent className="flex h-full flex-col gap-6 rounded-xl bg-stone-950 px-4 pb-12 pt-4 ring-1 ring-stone-900 md:pt-10">
        <SidebarTrigger />
        <PopoverPerfil>
          <SidebarMenuButton asChild>
            <button className="flex min-h-[46px] items-center gap-2 rounded-xl border border-green-200 px-3 py-1 group-data-[collapsible=icon]:px-2.5 group-data-[collapsible=icon]:[&>div]:hidden group-data-[collapsible=icon]:[&>svg]:hidden">
              <Image
                height={36}
                width={36}
                src={
                  session.status !== 'loading'
                    ? session.data?.user.image
                    : '/placeholderperfil.png'
                }
                alt=""
                className="size-9 min-w-9 rounded-full object-cover"
              />
              <div className="flex w-full max-w-[110px] flex-col">
                {session.status !== 'loading' ? (
                  <p className="truncate text-start text-sm font-bold">
                    {session.data?.user.name}
                  </p>
                ) : (
                  <Skeleton className="h-4 w-full min-w-24 bg-zinc-700" />
                )}
                {session.status !== 'loading' ? (
                  <span className="truncate text-xs">
                    {session.data?.user.email}
                  </span>
                ) : (
                  <Skeleton className="mt-1 h-3 w-full min-w-24 bg-zinc-700" />
                )}
              </div>
              <CaretDown size={16} className="ml-auto" />
            </button>
          </SidebarMenuButton>
        </PopoverPerfil>
        <Menu />
        <div className="h-px w-full bg-gray-900"></div>
      </SidebarContent>
    </Sidebar>
  )
}
