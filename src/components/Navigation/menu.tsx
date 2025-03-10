"use client"
import { BookmarkSimple, Chats, ListDashes } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components"
import { usePathname, useRouter } from "next/navigation"

export const Menu = () => {

    const params = usePathname()
    const router = useRouter()
    function handleRouter(params: string){
        router.replace(params)
    }

    return (
        <menu>
            <ul className="grid gap-3">
                <li><Button onClick={()=> handleRouter("/")} isActive={params === '/'} state="menu" iconLeft={Chats}>Feed</Button></li>
                <li><Button onClick={()=> handleRouter("/topicos")} isActive={params === '/topicos'} state="menu" iconLeft={ListDashes} >Meus Topicos</Button></li>
                <li><Button onClick={()=> handleRouter("/salvos")} isActive={params === '/salvos'} state="menu" iconLeft={BookmarkSimple}>Salvos</Button></li>
            </ul>
        </menu>
    )
}