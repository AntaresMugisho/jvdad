'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { org } from '@/lib/config'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-green-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0C15 5 15 15 20 20C25 15 25 5 20 0ZM0 20C-5 25 -5 35 0 40C5 35 5 25 0 20Z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      <Container className="relative z-10 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-[var(--primary-green)] text-sm font-semibold mb-6">
              {org.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              {org.name} — <span className="text-[var(--primary-green)]">Visons plus haut,</span> Travaillons grand.
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Nous portons des projets agricoles responsables, développons des communautés rurales et partageons des bonnes pratiques pour nourrir demain.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projets"
                className="inline-flex items-center justify-center rounded-lg font-medium shadow-lg shadow-green-200 transition-all hover:-translate-y-1 bg-[var(--primary-green)] text-white hover:bg-[var(--primary-green-dark)] px-6 py-3 text-base"
              >
                Voir nos projets
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all hover:-translate-y-1 bg-white text-[var(--primary-green)] border border-[var(--primary-green)] hover:bg-green-50 px-6 py-3 text-base"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>




          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img src="/images/hero-bg.png" alt="Champs de maïs" className="w-full h-64 object-cover rounded-lg mb-4" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ensemble</h3>
                  <p className="text-gray-600">Pratiquons une agriculture en équilibre avec l’environnement !</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
