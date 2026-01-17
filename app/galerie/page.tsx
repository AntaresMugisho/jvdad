import Section from '@/components/Section'
import ImageCard from '@/components/cards/ImageCard'
import { contentService } from '@/lib/services/content'

export const metadata = { title: 'Galerie · JVDAD' }

export default async function Page() {
  const images = await contentService.getGallery()
  return (
    <Section title="Galerie" description="Moments de terrain, transformations et paysages.">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((g) => (
          <ImageCard key={g.id} item={g} />
        ))}
      </div>
    </Section>
  )
}
