import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/cards/ProjectCard'
import PostCard from '@/components/cards/PostCard'
import ImageCard from '@/components/cards/ImageCard'
import Link from 'next/link'
import { contentService } from '@/lib/services/content'
import { FaLeaf, FaUsers, FaSeedling, FaHandsHelping, FaArrowRight } from 'react-icons/fa';


export default async function Page() {
  const [projects, posts, images] = await Promise.all([
    contentService.getProjects(),
    contentService.getPosts(),
    contentService.getGallery(),
  ])
  return (
    <>
      <Hero />

      <section className="relative bg-gradient-to-br from-[var(--primary-green)] to-[var(--primary-green-dark)] text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[var(--accent-yellow)] font-semibold">- JVDAD -</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Jeunes Vissionaires pour le Développement  et Agriculture Durable
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Autonomiser les communautés rurales par l&apos;agriculture durable et la formation
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="bg-white text-[var(--primary-green)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Nos Projets
                <FaArrowRight />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[var(--primary-green)] transition-colors"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 opacity-10">
          <FaSeedling className="text-[200px]" />
        </div>
      </section>

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
