'use client'
import { SessionProviderNextAuth } from '@/providers/sessionProvider'
import { ChakraUIProvider } from '@/providers/chakra-ui'
import Loading from '@/app/loading'
import React, { ReactNode, useEffect, useState } from 'react'

const RenderMounted = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <Loading />
  return children
}

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <SessionProviderNextAuth>
      <RenderMounted>
        <ChakraUIProvider>{children}</ChakraUIProvider>
      </RenderMounted>
    </SessionProviderNextAuth>
  )
}
