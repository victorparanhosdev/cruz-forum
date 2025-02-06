"use client"
import { BookmarkSimple, CaretDown, Chats, ListDashes } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../Button"
import { usePathname } from "next/navigation"

export const Menu = ()=> {
    const params = usePathname()


    return(
        <nav className="bg-stone-950 rounded-xl px-4 pt-12 flex flex-col gap-6">
        <img src="../logo-home.svg" alt="" className="max-w-[166px]" />
        <button className="flex gap-2 border border-green-200 rounded-xl items-center py-1 px-3">
            <img src="https://github.com/victorparanhosdev.png" alt="" className="object-cover h-9 w-9 rounded-full" />
            <div className="flex flex-col max-w-[110px]">
                <p className="text-sm font-bold truncate">Victor Paranhos</p>
                <span className="text-xs  truncate">victorparanhos@email.com</span>
            </div>
            <CaretDown size={16} />
        </button>

        <menu>
            <ul className="grid gap-3">
                <li><Button isActive={params === '/'} className="w-full justify-start" size="sm" state="transparent" iconLeft={Chats}>Feed</Button></li>
                <li><Button isActive={params === '/topicos'} className="w-full justify-start" size="sm" state="transparent" iconLeft={ListDashes} >Meus Topicos</Button></li>
                <li><Button isActive={params === '/salvos'} className="w-full justify-start" size="sm" state="transparent" iconLeft={BookmarkSimple}>Salvos</Button></li>
            </ul>
        </menu>

        <div className="w-full h-px bg-gray-900"></div>

    </nav>
    )
}