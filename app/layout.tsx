import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import { org } from '@/lib/config'

export const metadata: Metadata = {
  title: `${org.name} · JVDAD Asbl`,
  description: org.tagline,
  icons: { icon: '/images/logo.jpeg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
