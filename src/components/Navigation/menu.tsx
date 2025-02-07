"use client"
import { BookmarkSimple, Chats, ListDashes } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../Button"
import { usePathname } from "next/navigation"

export const Menu = () => {

    const params = usePathname()

    return (
        <menu>
            <ul className="grid gap-3">
                <li><Button isActive={params === '/'} state="menu" iconLeft={Chats}>Feed</Button></li>
                <li><Button isActive={params === '/topicos'} state="menu" iconLeft={ListDashes} >Meus Topicos</Button></li>
                <li><Button isActive={params === '/salvos'} state="menu" iconLeft={BookmarkSimple}>Salvos</Button></li>
            </ul>
        </menu>
    )
}