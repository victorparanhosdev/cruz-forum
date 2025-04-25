'use client'
import { useIsMobile } from '@/hooks/use-mobile-relevant'
import {
  ComponentProps,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type CardRelevantContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
  toggleCardRelevant: () => void
}

const CardRelevantContext = createContext<CardRelevantContextProps | null>(null)

function useCardRelevant() {
  const context = useContext(CardRelevantContext)
  if (!context) {
    throw new Error('useCardRelevant must be used within a SidebarProvider.')
  }

  return context
}

const CARDRELEVANT_COOKIE_NAME = 'cardrelevant_state'
const CARDRELEVANT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const CardRelevantProvider = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = false,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile()
    const [_open, _setOpen] = useState(defaultOpen)

    const open = openProp ?? _open

    const setOpen = useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        document.cookie = `${CARDRELEVANT_COOKIE_NAME}=${openState}; path=/; max-age=${CARDRELEVANT_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open],
    )

    const toggleCardRelevant = useCallback(() => {
      return setOpen((open) => !open)
    }, [setOpen])

    const contextValue = useMemo<CardRelevantContextProps>(
      () => ({ open, setOpen, isMobile, toggleCardRelevant }),
      [open, setOpen, isMobile, toggleCardRelevant],
    )

    return (
      <CardRelevantContext.Provider value={contextValue}>
        {children}
      </CardRelevantContext.Provider>
    )
  },
)

CardRelevantProvider.displayName = 'CardRelevantProvider'

export { CardRelevantProvider, useCardRelevant }
