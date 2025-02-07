import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/Button"
import { ReactNode } from "react"
import { SignOut, User } from "@phosphor-icons/react/dist/ssr"

export const PopoverPerfil = ({children}: {children: ReactNode}) => {
  return (
    <PopoverRoot positioning={{ sameWidth: true }}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="bg-zinc-950 rounded-lg border border-gray-900" width="auto" overflow="hidden">
        <PopoverBody padding="initial" >
          <Button state="menu" iconLeft={User} className="rounded-none">Perfil</Button>
          <div className="w-full h-px bg-gray-900"></div>
          <Button state="menu" iconLeft={SignOut} className="text-red-500 hover:text-red-400 hover:bg-red-950 rounded-none">Sair da conta</Button>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}