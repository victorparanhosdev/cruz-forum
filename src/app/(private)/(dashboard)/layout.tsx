export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col md:py-6 md:pr-6">
      {children}
    </div>
  )
}
