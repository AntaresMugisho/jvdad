import Image from 'next/image'
import { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.date)
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-1 text-xs text-slate-500">{date.toLocaleDateString('fr-FR')}</p>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
