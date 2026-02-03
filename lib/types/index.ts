export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  created_at: string
  image: string
  tags: string[]
  slug: string
  author?: string
  content?: any[] // EditorJS blocks
}

export interface Project {
  id: string
  name: string
  description: string
  objective: string
  location: string
  image: string
  expected_results: string[]
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category?: string
}

export interface Testimonial {
  id: string,
  author_name: string
  author_role: string
  author_image: string
  content: string
}

export interface Organisation{
  name: string
  email: string
  phone_number: string
  social_links: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
    youtube: string
  }
}

export interface Address {
  organisation: Organisation
  street: string
  city: string
  state: string
  country: string
  zip_code: string
}