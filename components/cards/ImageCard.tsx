import Image from 'next/image'
import { GalleryImage } from '@/lib/types'

export default function ImageCard({ item }: { item: GalleryImage }) {
  return (
    <figure className="card overflow-hidden">
      <div className="relative aspect-square">
        <Image src={item.src} alt={item.description} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <figcaption className="p-3 text-sm text-slate-600">{item.description}</figcaption>
    </figure>
  )
}
