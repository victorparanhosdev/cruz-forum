'use client'
import {
  ComponentProps,
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from 'react'

type CardRelevantContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const CardRelevantContext = createContext<CardRelevantContextProps | null>(null)

function useCardRelevant() {
  const context = useContext(CardRelevantContext)
  if (!context) {
    throw new Error('useCardRelevant must be used within a SidebarProvider.')
  }

  return context
}
const CardRelevantProvider = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, style, children, ...props }, ref) => {

    const [open, setOpen] = useState(false)

    const contextValue = useMemo<CardRelevantContextProps>(
      () => ({ open, setOpen }),
      [open, setOpen],
    )

    return (
      <CardRelevantContext.Provider value={contextValue}>
        <div {...props} ref={ref}>
        {children}
        </div>
      </CardRelevantContext.Provider>
    )
  },
)

CardRelevantProvider.displayName = 'CardRelevantProvider'

export { CardRelevantProvider, useCardRelevant }
