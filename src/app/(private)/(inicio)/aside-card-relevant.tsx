'use client'

import { StarFour } from '@phosphor-icons/react'
import { ComponentProps } from 'react'

import { CardRelevantProps } from './card-relevant-content'
import { cn } from '@/lib/utils'
import { Card } from '@/components'
import { useCardRelevant } from './context-relevant'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile-relevant'

interface AsideRelevantProps extends ComponentProps<'aside'> {
  data: CardRelevantProps[]
}

export const AsideRelevant = ({
  className,
  data,
  ...props
}: AsideRelevantProps) => {
  const { open, setOpen } = useCardRelevant()
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen} {...props}>
        <SheetContent
          className="h-auto max-w-72 overflow-auto rounded-bl-xl rounded-tl-xl bg-stone-950 px-4 pb-6 pt-12 ring-1 ring-stone-900 sm:max-w-72 md:inset-y-4 md:rounded-xl"
          side={'right'}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Cards Relevants</SheetTitle>
            <SheetDescription>Displays the Cards Relevants.</SheetDescription>
          </SheetHeader>
          <h2 className="mb-8 flex items-center gap-1 text-sm">
            <StarFour size={16} /> Mais Relevantes
          </h2>

          <div className="flex max-h-[calc(100dvh-172px)] flex-col gap-4 overflow-y-auto">
            {data.map((dataCard: CardRelevantProps) => {
              return <Card key={dataCard.id} dataCard={dataCard} />
            })}
          </div>
        </SheetContent>
      </Sheet>
    )
  }
  return (
    <aside
      {...props}
      className={cn(
        'h-view-relevantes fixed bottom-4 right-4 top-4 w-[257px] overflow-auto rounded-xl bg-stone-950 px-4 pt-12 ring-1 ring-stone-900',
        className,
      )}
    >
      <h2 className="mb-8 flex items-center gap-1 text-sm">
        <StarFour size={16} /> Mais Relevantes
      </h2>

      <div className="flex flex-col gap-4">
        {data.map((dataCard: CardRelevantProps) => {
          return <Card key={dataCard.id} dataCard={dataCard} />
        })}
      </div>
    </aside>
  )
}
