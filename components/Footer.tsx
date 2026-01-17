import Container from '@/components/ui/Container'
import { org, links } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container className="py-8 text-sm text-slate-600">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {org.name}. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-slate-900" href={links.mailto}>Email</a>
            <a className="hover:text-slate-900" href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="hover:text-slate-900" href="/contact">Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
