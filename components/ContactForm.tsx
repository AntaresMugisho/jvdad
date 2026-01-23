'use client'

import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

export default function ContactForm({ variant = 'default' }: { variant?: 'default' | 'footer' }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const isFooter = variant === 'footer'
    const inputBg = isFooter ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
    const labelColor = isFooter ? 'text-gray-300' : 'text-gray-700'

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est requis'
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide'
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Le sujet est requis'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Le message est requis'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Le message doit contenir au moins 10 caractères'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        setSubmitStatus('idle')

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData)
            setSubmitStatus('success')
            setIsSubmitting(false)
            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            })
            setErrors({})

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000)
        }, 1500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {submitStatus === 'success' && (
                <div className={`p-4 rounded-lg ${isFooter ? 'bg-green-900/30 border-green-800 text-green-300' : 'bg-green-50 border-green-200 text-green-800'} border`}>
                    ✓ Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.
                </div>
            )}

            <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${labelColor}`}>
                    Nom complet *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : inputBg} focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent transition-all`}
                    placeholder="Jean Dupont"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${labelColor}`}>
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : inputBg} focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent transition-all`}
                    placeholder="jean.dupont@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${labelColor}`}>
                    Sujet *
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : inputBg} focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent transition-all`}
                    placeholder="Demande d'information"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
            </div>

            <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${labelColor}`}>
                    Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : inputBg} focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent transition-all resize-none`}
                    placeholder="Votre message..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[var(--primary-green)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary-green-dark)] transition-colors inline-flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {isSubmitting ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <FaPaperPlane />
                        Envoyer le message
                    </>
                )}
            </button>
        </form>
    )
}
