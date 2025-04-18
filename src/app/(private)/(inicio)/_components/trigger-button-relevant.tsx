'use client'
import { StarFour } from '@phosphor-icons/react'

export const TriggerButtonRelevant = () => {
  return (
    <button
      className={`fixed -right-[100px] top-1.5 z-20 flex items-center gap-3 rounded-bl-[30px] rounded-tl-[30px] bg-stone-950/80 p-3 ring-1 ring-stone-900 transition-all duration-300 hover:right-0 md:top-6 md:p-4 min-[1280px]:hidden`}
    >
      <StarFour size={28} className="text-green-400" weight="fill" />
      <span className="whitespace-nowrap text-base">Relevantes</span>
    </button>
  )
}
