import { Navigation } from '@/components/Navigation'

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid grid-cols-view-all min-h-view-without-fill gap-6 w-full p-6">
      <Navigation />
      {children}
    </div>
  )
}
