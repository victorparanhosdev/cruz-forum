'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'
import { CircleNotch } from '@phosphor-icons/react'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})

type ColorsProps = 'success' | 'error' | 'loading' | 'info'

const toastColors: Record<ColorsProps, string> = {
  success: '#002A25',
  error: '#7F1D1D',
  loading: '#1D282A',
  info: '#000',
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => {
          const bg = toastColors[toast.type]

          return (
            <Toast.Root
              width={{ md: 'sm' }}
              bg={bg}
              borderRadius="lg"
              padding="4"
            >
              {toast.type === 'loading' ? (
                <CircleNotch className="animate-spin text-black" size={20} />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && (
                  <Toast.Title fontWeight="bold">{toast.title}</Toast.Title>
                )}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
              )}
              {toast.meta?.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}
