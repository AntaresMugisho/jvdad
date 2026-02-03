import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PostCard from '@/components/cards/PostCard'
import BlockRenderer from '@/components/BlockRenderer'
import { FaArrowLeft, FaCalendar, FaUser, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa'
import { blogAPI } from '@/lib/api'
import { Post } from '@/lib/types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post: Post = await blogAPI.posts.detail(slug)
    if (!post) return { title: 'Article non trouvé' }
    return { title: `${post.title} · JVDAD Blog` }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const [post, allPosts] = await Promise.all([
        blogAPI.posts.detail(slug),
        blogAPI.posts.list(),
    ])

    if (!post) {
        notFound()
    }

    // Get related posts (exclude current post, limit to 3)
    const relatedPosts = allPosts
        .filter(p => p.id !== post.id && p.tags?.some(tag => post.tags?.includes(tag)))
        .slice(0, 3)

    const shareText = "Cet artcle posté sur le site de JVDAD pourrait vous intérersser.\n"
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://jvdad.org/blog/' + post.slug

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[var(--primary-green)] hover:text-[var(--primary-green-dark)] transition-colors"
                    >
                        <FaArrowLeft />
                        Retour aux articles
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags?.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-[var(--primary-green)] text-white text-sm rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <FaUser className="text-sm" />
                                <span>{'JVDAD'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendar className="text-sm" />
                                <span>{new Date(post.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">

                    {/* Article Content */}
                    <article className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-8">
                        {post.content  ? (
                            <BlockRenderer blocks={post.content.blocks} />
                        ) : (
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-500 italic">Contenu non disponible ou format incorrect.</p>
                            </div>
                        )}
                    </article>

                    {/* Share Buttons */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Partager cet article</h3>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <FaWhatsapp />
                                WhatsApp
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareText + shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <FaFacebook />
                                Facebook
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                            >
                                <FaTwitter />
                                Twitter
                            </a>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Articles connexes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map(relatedPost => (
                                    <PostCard key={relatedPost.id} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
