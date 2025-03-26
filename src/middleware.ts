import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: ['/perfil', '/salvos', '/topicos/:slug', '/', '/topicos'],
}
