import { Navigation } from '@/components/Navigation'

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-view-without-fill w-full grid-cols-view-all gap-6 p-6">
      <Navigation />
      {children}
    </div>
  )
}
