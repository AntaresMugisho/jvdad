import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { links } from '@/lib/config'

export const metadata = { title: 'Contact · JVDAD' }

export default function Page() {
  return (
    <div className="section">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contact</h1>
        <p className="mt-4 text-slate-600 max-w-2xl">Pour toute question, partenariat ou information sur nos projets, contactez-nous.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900">WhatsApp</h3>
            <p className="mt-2 text-sm text-slate-600">Discutez avec notre équipe via WhatsApp.</p>
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 w-fit">Ouvrir WhatsApp</a>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900">Email</h3>
            <p className="mt-2 text-sm text-slate-600">Écrivez-nous et nous répondrons rapidement.</p>
            <a href={links.mailto} className="mt-4 inline-flex items-center rounded-lg bg-white text-primary-700 ring-1 ring-inset ring-primary-600/20 hover:bg-primary-50 px-4 py-2 w-fit">Envoyer un email</a>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900">Adresse</h3>
            <p className="mt-2 text-sm text-slate-600">Siège JVDAD — à compléter</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
