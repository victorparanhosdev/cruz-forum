import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChakraUIProvider } from '@/providers/chakra-ui'
import { SessionProviderNextAuth } from '@/providers/sessionProvider'

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Cruz Forum',
    default: 'Cruz Forum',
  },
  description:
    'Comunidade online para criar tópicos, debater ideias e interagir com outros usuários de forma colaborativa',
  keywords: [
    'fórum',
    'discussão',
    'comunidade',
    'tópicos',
    'debate',
    'interação',
  ],
  authors: [{ name: 'Victor Paranhos' }],
  creator: 'Victor Paranhos',
  publisher: 'Cruz Forum',
}
import { Toaster } from '@/components/ui/toaster'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={interFont.className} lang="pt-BR" suppressHydrationWarning>
      <body
        className={`flex min-h-screen items-center justify-center bg-black text-white antialiased`}
      >
        <SessionProviderNextAuth>
          <ChakraUIProvider>
            {children} <Toaster />
          </ChakraUIProvider>
        </SessionProviderNextAuth>
      </body>
    </html>
  )
}
