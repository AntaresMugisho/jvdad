import Container from '@/components/ui/Container'
import { ReactNode } from 'react'

export default function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="section">
      <Container>
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
          {description && <p className="mt-2 text-slate-600">{description}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}
