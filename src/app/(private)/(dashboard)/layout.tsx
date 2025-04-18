export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-view-without-fill w-full flex-col md:py-6 md:pr-6">
      {children}
    </div>
  )
}
