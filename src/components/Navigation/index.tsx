import { CaretDown } from '@phosphor-icons/react/dist/ssr'
import { PopoverPerfil, Menu } from '@/components'
import Image from 'next/image'
export const Navigation = () => {
  return (
    <nav className="flex flex-col gap-6 rounded-xl bg-stone-950 px-4 pt-12">
      <Image
        width={166}
        height={54}
        src="/logo-home.svg"
        alt="logo da aplicacao"
        className="max-w-[166px]"
      />
      <PopoverPerfil>
        <button className="flex items-center gap-2 rounded-xl border border-green-200 px-3 py-1">
          <Image
            height={36}
            width={36}
            src="https://github.com/victorparanhosdev.png"
            alt=""
            className="size-9 rounded-full object-cover"
          />
          <div className="flex max-w-[110px] flex-col">
            <p className="truncate text-sm font-bold">Victor Paranhos</p>
            <span className="truncate  text-xs">victorparanhos@email.com</span>
          </div>
          <CaretDown size={16} />
        </button>
      </PopoverPerfil>

      <Menu />

      <div className="h-px w-full bg-gray-900"></div>
    </nav>
  )
}
