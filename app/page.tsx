import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/cards/ProjectCard'
import PostCard from '@/components/cards/PostCard'
import ImageCard from '@/components/cards/ImageCard'
import Link from 'next/link'
import { contentService } from '@/lib/services/content'

export default async function Page() {
  const [projects, posts, images] = await Promise.all([
    contentService.getProjects(),
    contentService.getPosts(),
    contentService.getGallery(),
  ])
  return (
    <>
      <Hero />
      <Section title="Nos projets" description="Des initiatives concrètes sur le terrain.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/projets" className="text-sm font-medium text-primary-700 hover:text-primary-800">Voir tous les projets →</Link>
        </div>
      </Section>
      <Section title="Articles" description="Actualités, conseils et retours d'expérience.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((b) => (
            <PostCard key={b.id} post={b} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/blog" className="text-sm font-medium text-primary-700 hover:text-primary-800">Voir tous les articles →</Link>
        </div>
      </Section>
      <Section title="Galerie" description="Images de nos activités et de nos territoires.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.slice(0, 6).map((g) => (
            <ImageCard key={g.id} item={g} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/galerie" className="text-sm font-medium text-primary-700 hover:text-primary-800">Voir la galerie →</Link>
        </div>
      </Section>
    </>
  )
}
