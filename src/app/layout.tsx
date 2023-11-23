import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Notification } from '@/components/Notification'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restaurante',
  description: 'Restaurante',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster richColors closeButton />
          <Notification />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
