'use client'
import React from 'react'
import { useSidebar } from './sidebar'
import { Button } from '../Button'
import { cn } from '@/lib/utils'
import { List } from '@phosphor-icons/react'

export const SidebarTriggerMobile = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, 'children'>
>(({ className, onClick, ...props }, ref) => {
  const { isMobile, toggleSidebar } = useSidebar()

  if (!isMobile) {
    return null
  }

  return (
    <button
      ref={ref}
      data-sidebar="trigger"
      className={cn('p-4', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <List size={32} />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
})
SidebarTriggerMobile.displayName = 'SidebarTrigger'
