import Section from '@/components/Section'
import ProjectCard from '@/components/cards/ProjectCard'
import { contentService } from '@/lib/services/content'

export const metadata = { title: 'Projets · JVDAD' }

export default async function Page() {
  const projects = await contentService.getProjects()
  return (
    <Section title="Projets" description="Toutes nos initiatives en cours et réalisées.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  )
}
