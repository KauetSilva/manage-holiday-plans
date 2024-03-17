import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/providers/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Manage Holiday',
  description: 'é uma aplicação desenvolvida para facilitar o gerenciamento de feriados.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
      </body>
    </html>
  )
}
