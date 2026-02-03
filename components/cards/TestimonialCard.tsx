import { Testimonial } from "@/lib/types";
import { FaQuoteLeft } from "react-icons/fa";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const name = testimonial.author_name ?? (testimonial as any).name ?? "";
  const role = testimonial.author_role ?? (testimonial as any).role ?? "";
  const organisation = testimonial.author_organisation ?? (testimonial as any).organization ?? "";
  const avatar = testimonial.author_image ?? (testimonial as any).avatar ?? "";

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <FaQuoteLeft className="text-[var(--primary-green)] text-2xl mb-4 opacity-50" />

      <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {avatar && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <img src={avatar} alt={name} className="object-cover w-full h-full" />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          {role && <p className="text-sm text-gray-600">{role}</p>}
          {organisation && <p className="text-xs text-gray-500 mt-1">{organisation}</p>}
        </div>
      </div>
    </div>
  );
}
