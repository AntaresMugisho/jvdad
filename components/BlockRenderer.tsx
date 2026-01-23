import React from 'react'
import Image from 'next/image'

interface BlockRendererProps {
    blocks: any[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
    if (!blocks || !Array.isArray(blocks)) return null

    return (
        <div className="prose prose-lg max-w-none">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'header':
                        const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements
                        return (
                            <HeaderTag key={index} className="font-bold text-gray-900 mt-8 mb-4">
                                {block.data.text}
                            </HeaderTag>
                        )

                    case 'paragraph':
                        return (
                            <p key={index} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        )

                    case 'list':
                        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul'
                        return (
                            <ListTag key={index} className="ml-6 mb-4 text-gray-700 leading-relaxed list-disc">
                                {block.data.items.map((item: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ListTag>
                        )

                    case 'quote':
                        return (
                            <blockquote key={index} className="border-l-4 border-[var(--primary-green)] pl-4 italic my-6 text-gray-700 bg-gray-50 p-4 rounded-r-lg">
                                <p className="mb-2">{block.data.text}</p>
                                {block.data.caption && <cite className="text-sm text-gray-500 not-italic">- {block.data.caption}</cite>}
                            </blockquote>
                        )

                    case 'image':
                        return (
                            <figure key={index} className="my-8">
                                <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
                                    <Image
                                        src={block.data.file.url}
                                        alt={block.data.caption || ''}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {block.data.caption && (
                                    <figcaption className="text-center text-sm text-gray-500 mt-2">
                                        {block.data.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )

                    default:
                        return null
                }
            })}
        </div>
    )
}
