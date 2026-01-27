'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Container from '@/components/ui/Container'
import { org, links } from '@/lib/config'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const toggle = () => setOpen((o) => !o)

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const NavLinks = () => (
    <>
      <Link
        href="/"
        className={`px-3 py-2 rounded-md transition-colors ${isActive('/')
            ? 'bg-primary-100 text-primary-700 font-semibold'
            : 'hover:bg-primary-50'
          }`}
      >
        Accueil
      </Link>
      <Link
        href="/a-propos"
        className={`px-3 py-2 rounded-md transition-colors ${isActive('/a-propos')
            ? 'bg-primary-100 text-primary-700 font-semibold'
            : 'hover:bg-primary-50'
          }`}
      >
        À propos
      </Link>
      <Link
        href="/projets"
        className={`px-3 py-2 rounded-md transition-colors ${isActive('/projets')
            ? 'bg-primary-100 text-primary-700 font-semibold'
            : 'hover:bg-primary-50'
          }`}
      >
        Projets
      </Link>
      <Link
        href="/blog"
        className={`px-3 py-2 rounded-md transition-colors ${isActive('/blog')
            ? 'bg-primary-100 text-primary-700 font-semibold'
            : 'hover:bg-primary-50'
          }`}
      >
        Blog
      </Link>
      <Link
        href="/galerie"
        className={`px-3 py-2 rounded-md transition-colors ${isActive('/galerie')
            ? 'bg-primary-100 text-primary-700 font-semibold'
            : 'hover:bg-primary-50'
          }`}
      >
        Galerie
      </Link>
      <Link
        href="/contact"
        className={`px-3 py-2 rounded-md transition-colors ${isActive('/contact')
            ? 'bg-primary-100 text-primary-700 font-semibold'
            : 'hover:bg-primary-50'
          }`}
      >
        Contact
      </Link>
    </>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.jpeg" alt="Logo" className="h-8 w-8" />
            <span className="font-bold tracking-tight">{org.name}</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm text-slate-700">
          <NavLinks />
          <a href={links.whatsapp} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center rounded-lg bg-primary-600 px-3 py-2 text-white hover:bg-primary-700">
            WhatsApp
          </a>
        </nav>
        <button aria-label="Menu" className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3.75 6.75h16.5v1.5H3.75zm0 4.5h16.5v1.5H3.75zm0 4.5h16.5v1.5H3.75z" /></svg>
        </button>
      </Container>
      {open && (
        <div className="md:hidden border-t bg-white">
          <Container className="py-3 flex flex-col text-sm">
            <NavLinks />
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center rounded-lg bg-primary-600 px-3 py-2 text-white hover:bg-primary-700 w-fit">
              WhatsApp
            </a>
          </Container>
        </div>
      )}
    </header>
  )
}
