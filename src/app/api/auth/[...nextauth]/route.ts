import NextAuth from 'next-auth'
import { authOptions } from './auth-options' // ou '@/lib/auth' se você escolheu essa opção

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }