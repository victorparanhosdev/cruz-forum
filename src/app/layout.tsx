import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const interFont = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Cruz Forum",
  description: "Forum App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${interFont.className} antialiased bg-black p-6 text-white min-h-screen flex items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
