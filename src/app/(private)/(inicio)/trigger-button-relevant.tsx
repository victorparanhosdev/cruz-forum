'use client'
import { StarFour } from '@phosphor-icons/react'
import { useCardRelevant } from './context-relevant'

export const TriggerButtonRelevant = () => {
  const { toggleCardRelevant, isMobile } = useCardRelevant()

  if (!isMobile) {
    return null
  }

  return (
    <button
      onClick={toggleCardRelevant}
      className={`fixed -right-[100px] top-1.5 z-20 flex items-center gap-3 rounded-bl-[30px] rounded-tl-[30px] bg-stone-950/80 p-3 ring-1 ring-stone-900 transition-all duration-300 hover:right-0 md:top-4 md:p-4`}
    >
      <StarFour size={28} className="text-green-400" weight="fill" />
      <span className="whitespace-nowrap text-base">Relevantes</span>
    </button>
  )
}
