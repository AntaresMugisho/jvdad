import Container from '@/components/ui/Container'
import ContactForm from '@/components/ContactForm'
import { links, org } from '@/lib/config'

export const metadata = { title: 'Contact · JVDAD' }

export default function Page() {
  return (
    <div className="section">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contact</h1>
        <p className="mt-4 text-slate-600 max-w-2xl">Pour toute question, partenariat ou information sur nos projets, contactez-nous.</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">WhatsApp</h3>
              <p className="text-slate-600 mb-4">Discutez avec notre équipe via WhatsApp pour une réponse rapide.</p>
              <a href={links.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg bg-[#25D366] px-4 py-2 text-white hover:bg-[#128C7E] transition-colors w-fit">
                Ouvrir WhatsApp
              </a>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Email</h3>
              <p className="text-slate-600 mb-4">Écrivez-nous pour des demandes détaillées ou des partenariats.</p>
              <a href={links.mailto} className="inline-flex items-center rounded-lg bg-white text-[var(--primary-green)] border border-[var(--primary-green)] hover:bg-green-50 px-4 py-2 transition-colors w-fit">
                Envoyer un email
              </a>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Adresse</h3>
              <p className="text-slate-600">
                Siège JVDAD<br />
                {org.address}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  )
}
