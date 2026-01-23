import { Testimonial } from '@/lib/types/testimonial'
import { FaQuoteLeft } from 'react-icons/fa'

interface TestimonialCardProps {
    testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <FaQuoteLeft className="text-[var(--primary-green)] text-2xl mb-4 opacity-50" />

            <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {testimonial.avatar && (
                    <div className="text-3xl">
                        {testimonial.avatar}
                    </div>
                )}
                <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    {testimonial.location && (
                        <p className="text-xs text-gray-500 mt-1">{testimonial.location}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
