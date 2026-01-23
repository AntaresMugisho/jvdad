import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { contentService } from '@/lib/services/content'
import PostCard from '@/components/cards/PostCard'
import { FaArrowLeft, FaCalendar, FaUser, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa'

export async function generateMetadata({ params }: { params: { id: string } }) {
    const post = await contentService.getPostById(params.id)
    if (!post) return { title: 'Article non trouvé' }
    return { title: `${post.title} · JVDAD Blog` }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
    const [post, allPosts] = await Promise.all([
        contentService.getPostById(params.id),
        contentService.getPosts(),
    ])

    if (!post) {
        notFound()
    }

    // Get related posts (exclude current post, limit to 3)
    const relatedPosts = allPosts
        .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3)

    // Format content with proper line breaks
    const contentParagraphs = post.content?.split('\n').filter(line => line.trim()) || []

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = `${post.title} - JVDAD`

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
                            {post.tags.map(tag => (
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
                                <span>{post.author || 'JVDAD'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendar className="text-sm" />
                                <span>{new Date(post.date).toLocaleDateString('fr-FR', {
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
                        <div className="prose prose-lg max-w-none">
                            {contentParagraphs.map((paragraph, index) => {
                                // Check if it's a heading
                                if (paragraph.startsWith('# ')) {
                                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-gray-900">{paragraph.substring(2)}</h1>
                                } else if (paragraph.startsWith('## ')) {
                                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-gray-900">{paragraph.substring(3)}</h2>
                                } else if (paragraph.startsWith('### ')) {
                                    return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-[var(--primary-green)]">{paragraph.substring(4)}</h3>
                                } else if (paragraph.startsWith('- ')) {
                                    return (
                                        <li key={index} className="ml-6 text-gray-700 leading-relaxed list-disc">
                                            {paragraph.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, i) =>
                                                i % 2 === 0 ? part : <strong key={i} className="font-semibold text-gray-900">{part.replace('</strong>', '')}</strong>
                                            )}
                                        </li>
                                    )
                                } else if (paragraph.match(/^\d+\./)) {
                                    return (
                                        <li key={index} className="ml-6 text-gray-700 leading-relaxed list-decimal">
                                            {paragraph.replace(/^\d+\.\s/, '')}
                                        </li>
                                    )
                                } else if (paragraph.trim() && !paragraph.startsWith('#')) {
                                    // Regular paragraph - Handle bold text with **
                                    const parts = paragraph.split(/(\*\*.*?\*\*)/g)
                                    return (
                                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                                            {parts.map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
                                                }
                                                return part
                                            })}
                                        </p>
                                    )
                                }
                                return null
                            })}
                        </div>
                    </article>

                    {/* Share Buttons */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Partager cet article</h3>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <FaWhatsapp />
                                WhatsApp
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
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
