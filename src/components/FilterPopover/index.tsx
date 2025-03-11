import { Popover } from '@/components'
import { ReactNode } from 'react'
import {
  CaretUpDown,
  ChatTeardropText,
  Heart,
  StarFour,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr'

export const FilterPopover = ({ children }: { children: ReactNode }) => {
  return (
    <Popover.PopoverRoot positioning={{ sameWidth: true }}>
      <Popover.PopoverTrigger asChild>{children}</Popover.PopoverTrigger>
      <Popover.PopoverContent
        className="rounded-lg border border-stone-700 bg-zinc-950"
        overflow="hidden"
        width="fit-content"
      >
        <Popover.PopoverBody padding="initial">
          <ul className="bg-zinc-950 text-sm">
            <li className="flex w-full cursor-pointer items-center gap-2.5 whitespace-nowrap px-4 py-2.5 transition hover:bg-hover-btn-menu_card ">
              <StarFour size={20} />
              Recentes
            </li>
            <li className="flex w-full cursor-pointer items-center gap-2.5 whitespace-nowrap px-4 py-2.5 transition hover:bg-hover-btn-menu_card ">
              <TrendUp size={20} />
              Mais Relevantes
            </li>
            <li className="flex w-full cursor-pointer items-center gap-2.5 whitespace-nowrap px-4 py-2.5 transition hover:bg-hover-btn-menu_card ">
              <ChatTeardropText size={20} />
              Mais comentados
            </li>
            <li className="flex w-full cursor-pointer items-center gap-2.5 whitespace-nowrap px-4 py-2.5 transition hover:bg-hover-btn-menu_card ">
              <Heart size={20} />
              Mais curtidos
            </li>
            <li className="flex w-full cursor-pointer items-center gap-2.5 whitespace-nowrap px-4 py-2.5 transition hover:bg-hover-btn-menu_card ">
              <CaretUpDown size={20} />
              Ordenar A-Z
            </li>
          </ul>
        </Popover.PopoverBody>
      </Popover.PopoverContent>
    </Popover.PopoverRoot>
  )
}
