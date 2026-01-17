import Section from '@/components/Section'
import Container from '@/components/ui/Container'

export const metadata = { title: 'À propos · JVDAD' }

export default function Page() {
  return (
    <div className="section">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">À propos</h1>
        <p className="mt-4 text-slate-600 max-w-3xl">
          JVDAD est une organisation agricole dédiée à la promotion d’une agriculture durable, inclusive et résiliente. Nous accompagnons des communautés rurales dans le développement de projets à impact, la transmission de savoir-faire et la valorisation des filières locales.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900">Notre mission</h3>
            <p className="mt-2 text-sm text-slate-600">Soutenir la transition agroécologique et renforcer l’autonomie des producteurs.</p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900">Nos valeurs</h3>
            <p className="mt-2 text-sm text-slate-600">Coopération, transparence, innovation et respect des écosystèmes.</p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900">Notre approche</h3>
            <p className="mt-2 text-sm text-slate-600">Expérimenter localement, documenter et partager largement.</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
