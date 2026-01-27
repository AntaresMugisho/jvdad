import Hero from '@/components/Hero'
import Section from '@/components/Section'
import SectionWrapper from '@/components/SectionWrapper'
import ProjectCard from '@/components/cards/ProjectCard'
import PostCard from '@/components/cards/PostCard'
import ImageCard from '@/components/cards/ImageCard'
import TestimonialCard from '@/components/cards/TestimonialCard'
import StatCard from '@/components/cards/StatCard'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import Image from 'next/image'
import { contentService } from '@/lib/services/content'
import { FaLeaf, FaUsers, FaSeedling, FaHandsHelping, FaArrowRight, FaTractor, FaGraduationCap, FaChartLine, FaWater, FaCheck, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { org } from '@/lib/config'

export default async function Page() {
  const [projects, posts, images, testimonials] = await Promise.all([
    contentService.getProjects(),
    contentService.getPosts(),
    contentService.getGallery(),
    contentService.getTestimonials(),
  ])

  return (
    <>
      <Hero />

      {/* Mission & Goals Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionWrapper>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600">
                Autonomiser les communautés rurales par l'agriculture durable, la formation et le développement de projets innovants qui transforment des vies.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <SectionWrapper delay={0.1}>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100 hover:shadow-lg transition-shadow h-full">
                <div className="bg-[var(--primary-green)] text-white p-3 rounded-lg w-fit mb-4">
                  <FaLeaf className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Agriculture Durable
                </h3>
                <p className="text-gray-600">
                  Promouvoir des pratiques agricoles respectueuses de l'environnement qui préservent nos ressources naturelles.
                </p>
              </div>
            </SectionWrapper>

            <SectionWrapper delay={0.2}>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow h-full">
                <div className="bg-blue-600 text-white p-3 rounded-lg w-fit mb-4">
                  <FaGraduationCap className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Formation & Éducation
                </h3>
                <p className="text-gray-600">
                  Former les agriculteurs aux techniques modernes et aux meilleures pratiques agroécologiques.
                </p>
              </div>
            </SectionWrapper>

            <SectionWrapper delay={0.3}>
              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border border-yellow-100 hover:shadow-lg transition-shadow h-full">
                <div className="bg-[var(--accent-orange)] text-white p-3 rounded-lg w-fit mb-4">
                  <FaUsers className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Développement Communautaire
                </h3>
                <p className="text-gray-600">
                  Renforcer les communautés rurales à travers des projets collaboratifs et des initiatives locales.
                </p>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Un accompagnement complet pour transformer l'agriculture et développer les communautés rurales
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <SectionWrapper delay={0.1}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-full">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop"
                    alt="Formation agricole"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaGraduationCap className="text-[var(--primary-green)]" />
                    Formation et Renforcement des Capacités
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Programmes de formation sur les techniques agroécologiques, la gestion des ressources, et l'entrepreneuriat agricole.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Ateliers pratiques sur le terrain</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Formation continue et suivi personnalisé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SectionWrapper>

            {/* Service 2 */}
            <SectionWrapper delay={0.2}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-full">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop"
                    alt="Agriculture durable"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaSeedling className="text-[var(--primary-green)]" />
                    Conseil en Agroécologie
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Accompagnement personnalisé pour la transition vers des pratiques agricoles durables et productives.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Diagnostic de votre exploitation</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Plan de transition personnalisé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SectionWrapper>

            {/* Service 3 */}
            <SectionWrapper delay={0.3}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-full">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop"
                    alt="Gestion de l'eau"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaWater className="text-[var(--primary-green)]" />
                    Gestion des Ressources Naturelles
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Solutions innovantes pour la gestion de l'eau, la conservation des sols et la préservation de la biodiversité.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Systèmes d'irrigation efficaces</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Techniques de conservation des sols</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SectionWrapper>

            {/* Service 4 */}
            <SectionWrapper delay={0.4}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all h-full">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop"
                    alt="Agriculture moderne"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaTractor className="text-[var(--primary-green)]" />
                    Développement de Projets Agricoles
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Conception et mise en œuvre de projets agricoles innovants adaptés aux réalités locales.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Étude de faisabilité et planification</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="text-[var(--primary-green)] mt-1 flex-shrink-0" />
                      <span>Accompagnement à la mise en œuvre</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-green)] to-[var(--primary-green-dark)] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Notre Impact
              </h2>
              <p className="text-lg text-green-100 max-w-2xl mx-auto">
                Des résultats concrets qui transforment les communautés rurales
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <SectionWrapper delay={0.1}>
              <StatCard
                icon={FaUsers}
                value="1,500+"
                label="Agriculteurs formés"
                color="var(--primary-green)"
              />
            </SectionWrapper>
            <SectionWrapper delay={0.2}>
              <StatCard
                icon={FaSeedling}
                value="2,300"
                label="Hectares gérés durablement"
                color="var(--primary-green)"
              />
            </SectionWrapper>
            <SectionWrapper delay={0.3}>
              <StatCard
                icon={FaHandsHelping}
                value="45"
                label="Communautés servies"
                color="var(--primary-green)"
              />
            </SectionWrapper>
            <SectionWrapper delay={0.4}>
              <StatCard
                icon={FaChartLine}
                value="40%"
                label="Augmentation moyenne des rendements"
                color="var(--primary-green)"
              />
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <SectionWrapper>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Pourquoi Choisir JVDAD ?
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 bg-green-100 text-[var(--primary-green)] p-3 rounded-lg h-fit">
                        <FaCheck className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Expertise Locale</h3>
                        <p className="text-gray-600">
                          Une connaissance approfondie du contexte agricole de la région des Grands Lacs et des défis spécifiques aux communautés rurales.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 bg-green-100 text-[var(--primary-green)] p-3 rounded-lg h-fit">
                        <FaCheck className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Approche Participative</h3>
                        <p className="text-gray-600">
                          Nous travaillons main dans la main avec les agriculteurs, en valorisant leurs savoirs et en co-construisant les solutions.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 bg-green-100 text-[var(--primary-green)] p-3 rounded-lg h-fit">
                        <FaCheck className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Résultats Mesurables</h3>
                        <p className="text-gray-600">
                          Un suivi rigoureux et une évaluation continue pour garantir l'impact de nos interventions.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 bg-green-100 text-[var(--primary-green)] p-3 rounded-lg h-fit">
                        <FaCheck className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Vision Long Terme</h3>
                        <p className="text-gray-600">
                          Un engagement durable auprès des communautés, au-delà des projets ponctuels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionWrapper>

              <SectionWrapper delay={0.2}>
                <div className="relative">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/logo.jpeg"
                      alt="Agriculture durable"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 bg-[var(--accent-yellow)] rounded-2xl p-6 shadow-lg max-w-xs">
                    <p className="text-gray-900 font-semibold">
                      "JVDAD a transformé notre façon de cultiver. Nos récoltes ont doublé!"
                    </p>
                    <p className="text-sm text-gray-700 mt-2">- Marie K., Agricultrice</p>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Section title="Nos projets" description="Des initiatives concrètes sur le terrain.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p) => (
            <SectionWrapper key={p.id}>
              <ProjectCard project={p} />
            </SectionWrapper>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/projets" className="text-sm font-medium text-primary-700 hover:text-primary-800">Voir tous les projets →</Link>
        </div>
      </Section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Témoignages
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez les histoires de ceux qui ont transformé leur pratique agricole avec JVDAD
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <SectionWrapper key={testimonial.id} delay={index * 0.1}>
                <TestimonialCard testimonial={testimonial} />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <Section title="Articles" description="Actualités, conseils et retours d'expérience.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((b) => (
            <SectionWrapper key={b.id}>
              <PostCard post={b} />
            </SectionWrapper>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/blog" className="text-sm font-medium text-primary-700 hover:text-primary-800">Voir tous les articles →</Link>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section title="Galerie" description="Images de nos activités et de nos territoires.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.slice(0, 6).map((g) => (
            <SectionWrapper key={g.id}>
              <ImageCard item={g} />
            </SectionWrapper>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/galerie" className="text-sm font-medium text-primary-700 hover:text-primary-800">Voir la galerie →</Link>
        </div>
      </Section>

      {/* Contact Section */}
      <section className="py-16 bg-[var(--primary-green)] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionWrapper>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Contactez-nous
                </h2>
                <p className="text-lg text-green-100">
                  Une question ? Un projet ? Nous sommes à votre écoute.
                </p>
              </div>
            </SectionWrapper>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <SectionWrapper delay={0.1}>
                <div className="bg-white rounded-xl p-6 shadow-xl">
                  <ContactForm />
                </div>
              </SectionWrapper>

              {/* Contact Info */}
              <SectionWrapper delay={0.2}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">JVDAD</h3>
                    <p className="text-green-100 leading-relaxed">
                      Jeunes Visionnaires pour le Développement et l'Agriculture Durable
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Nos Bureaux</h4>
                    <p className="text-green-100">
                      {org.address}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Suivez-nous</h4>
                    <p className="text-green-100 mb-4">
                      Restez connectés pour suivre nos activités et nos projets sur le terrain.
                    </p>
                    <div className="flex gap-4">
                      <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors text-white">
                        <FaFacebook className="text-xl" />
                      </a>
                      <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors text-white">
                        <FaTwitter className="text-xl" />
                      </a>
                      <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors text-white">
                        <FaInstagram className="text-xl" />
                      </a>
                      <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors text-white">
                        <FaLinkedin className="text-xl" />
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-green-700">
                    <p className="text-sm text-green-200">
                      Nous répondons généralement sous 24-48 heures
                    </p>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
