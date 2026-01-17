import Image from 'next/image'
import { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{project.description}</p>
        {project.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
