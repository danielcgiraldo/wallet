import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Author } from 'next/dist/lib/metadata/types/metadata-types'

const inter = Inter({ subsets: ['latin'] })

const author: Author = {
    name: 'Daniel Castillo',
    url: "https://idaniel.dev"
}

export const metadata: Metadata = {
  title: 'Wallet | Manage your money smartly',
  description: 'Wallet is a web app that helps you manage your money smartly.',
  authors: [author]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
