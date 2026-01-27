import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { contentService } from '@/lib/services/content'
import ProjectCard from '@/components/cards/ProjectCard'
import { FaArrowLeft, FaCalendar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await contentService.getProjectById(id)
    if (!project) return { title: 'Projet non trouvé' }
    return { title: `${project.title} · JVDAD Projets` }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const [project, allProjects] = await Promise.all([
        contentService.getProjectById(id),
        contentService.getProjects(),
    ])

    if (!project) {
        notFound()
    }

    // Get related projects (exclude current project, limit to 3)
    const relatedProjects = allProjects
        .filter(p => p.id !== project.id && p.tags.some(tag => project.tags.includes(tag)))
        .slice(0, 3)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/projets"
                        className="inline-flex items-center gap-2 text-[var(--primary-green)] hover:text-[var(--primary-green-dark)] transition-colors"
                    >
                        <FaArrowLeft />
                        Retour aux projets
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-[var(--primary-green)] text-white text-sm rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">

                    {/* Project Description */}
                    <article className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">À propos du projet</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {project.description}
                            </p>
                        </div>

                        {/* Project Details Section */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Détails du projet</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <FaCheckCircle className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Objectif</h4>
                                        <p className="text-gray-600">
                                            Améliorer les pratiques agricoles et renforcer la résilience des communautés locales.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Localisation</h4>
                                        <p className="text-gray-600">
                                            Région des Grands Lacs, RDC
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Impact Section */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Impact attendu</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Augmentation des rendements agricoles</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Amélioration de la sécurité alimentaire</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Renforcement des capacités locales</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Protection de l'environnement</span>
                                </li>
                            </ul>
                        </div>
                    </article>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-br from-[var(--primary-green)] to-[var(--primary-green-dark)] rounded-xl shadow-md p-8 mb-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">Intéressé par ce projet ?</h3>
                        <p className="mb-6 text-green-100">
                            Contactez-nous pour en savoir plus sur nos initiatives et comment vous pouvez contribuer au développement durable.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-white text-[var(--primary-green)] px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                        >
                            Nous contacter
                        </Link>
                    </div>

                    {/* Related Projects */}
                    {relatedProjects.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Projets similaires</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedProjects.map(relatedProject => (
                                    <ProjectCard key={relatedProject.id} project={relatedProject} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
