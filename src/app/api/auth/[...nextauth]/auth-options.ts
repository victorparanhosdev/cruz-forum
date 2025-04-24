import type { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import FacebookProvider, { FacebookProfile } from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@auth/prisma-adapter'
import EmailProvider from 'next-auth/providers/email'
import prisma from '@/lib/prisma'
import { sendVerificationRequest } from './sendVerificationRequest'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      async profile(profile: FacebookProfile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.data?.url,
        }
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub

        const userData = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { name: true, image: true, email: true },
        })

        if (userData) {
          const defaultName = userData.name || userData.email.split('@')[0]
          const defaultImage = userData.image || '/placeholderperfil.png'

 
          if (!userData.name || !userData.image) {
            await prisma.user.update({
              where: { id: token.sub },
              data: {
                name: userData.name || defaultName,
                image: userData.image || defaultImage,
              },
            })
          }


          session.user.name = defaultName
          session.user.image = defaultImage
        }
      }

      return session
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }

      return token
    },
  },
  pages: {
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
}
