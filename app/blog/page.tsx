import Section from '@/components/Section'
import PostCard from '@/components/cards/PostCard'
import { contentService } from '@/lib/services/content'

export const metadata = { title: 'Blog · JVDAD' }

export default async function Page() {
  const posts = await contentService.getPosts()
  return (
    <Section title="Articles" description="Nos publications et retours d'expérience.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((b) => (
          <PostCard key={b.id} post={b} />
        ))}
      </div>
    </Section>
  )
}
