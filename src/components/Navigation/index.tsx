
import { CaretDown } from "@phosphor-icons/react/dist/ssr"
import {PopoverPerfil, Menu} from '@/components'
import Image from 'next/image'
export const Navigation = () => {

    return (
        <nav className="bg-stone-950 rounded-xl px-4 pt-12 flex flex-col gap-6">
            <Image width={166} height={54} src="/logo-home.svg" alt="logo da aplicacao" className="max-w-[166px]"/>
            <PopoverPerfil>
            <button className="flex gap-2 border border-green-200 rounded-xl items-center py-1 px-3">
                <Image height={36} width={36} src="https://github.com/victorparanhosdev.png" alt="" className="object-cover h-9 w-9 rounded-full" />
                <div className="flex flex-col max-w-[110px]">
                    <p className="text-sm font-bold truncate">Victor Paranhos</p>
                    <span className="text-xs  truncate">victorparanhos@email.com</span>
                </div>
                <CaretDown size={16} />
            </button>
            </PopoverPerfil>

            <Menu />

            <div className="w-full h-px bg-gray-900"></div>

        </nav>
    )
}