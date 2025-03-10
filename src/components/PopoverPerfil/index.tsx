import { Popover, Button } from "@/components"
import { ReactNode } from "react"
import { SignOut, User } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

export const PopoverPerfil = ({children}: {children: ReactNode}) => {


  return (
    <Popover.PopoverRoot positioning={{ sameWidth: true }}>
      <Popover.PopoverTrigger asChild>
        {children}
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="bg-zinc-950 rounded-lg border border-gray-900" width="auto" overflow="hidden">
        <Popover.PopoverBody padding="initial" >
         <Link href={"/perfil"}><Button state="menu" iconLeft={User} className="rounded-none">Perfil</Button></Link>
          <div className="w-full h-px bg-gray-900"></div>
          <Link href={"/login"}><Button state="menu" iconLeft={SignOut} className="text-red-500 hover:text-red-400 hover:bg-red-950 rounded-none">Sair da conta</Button></Link>
        </Popover.PopoverBody>
      </Popover.PopoverContent>
    </Popover.PopoverRoot>
  )
}