import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { org } from '@/lib/config'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="badge">{org.tagline}</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            {org.name} — Visons plus haut, Travaillons grand.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Nous portons des projets agricoles responsables, développons des communautés rurales et partageons des bonnes pratiques pour nourrir demain.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/projets"
              className="inline-flex items-center justify-center rounded-lg font-medium shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600 px-4 py-2 text-sm"
            >
              Voir nos projets
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg font-medium shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-primary-700 ring-1 ring-inset ring-primary-600/20 hover:bg-primary-50 px-4 py-2 text-sm"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
