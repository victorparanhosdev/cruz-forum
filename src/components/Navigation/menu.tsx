'use client'
import {
  BookmarkSimple,
  Chats,
  ListDashes,
} from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components'
import { usePathname, useRouter } from 'next/navigation'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'

export const Menu = () => {
  const params = usePathname()
  const router = useRouter()
  const { setOpenMobile, isMobile } = useSidebar()
  function handleRouter(params: string) {
    router.push(params)
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <SidebarMenu className="grid gap-3">
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            onClick={() => handleRouter('/')}
            isActive={params === '/'}
            state="menu"
            iconLeft={Chats}
          >
            Feed
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            onClick={() => handleRouter('/topicos')}
            isActive={params === '/topicos'}
            state="menu"
            iconLeft={ListDashes}
          >
            Meus Topicos
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            onClick={() => handleRouter('/salvos')}
            isActive={params === '/salvos'}
            state="menu"
            iconLeft={BookmarkSimple}
          >
            Salvos
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
