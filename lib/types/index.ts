export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
}

export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  tags: string[]
  author?: string
  content?: any[] // EditorJS blocks
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category?: string
}
