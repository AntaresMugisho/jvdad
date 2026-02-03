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
  status?: string
  budget?: number
  created_at?: string
  updated_at?: string
}

export interface GalleryImage {
  id: string
  src: string
  description: string
  created_at?: string
  updated_at?: string
}

export interface Testimonial {
  id: string
  author_name: string
  author_role: string
  author_image?: string
  author_organisation?: string
  content: string
  created_at?: string
  updated_at?: string
}

export interface Organisation{
  id: string
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
  id: string
  street: string
  city: string
  state: string
  country: string
  zip_code: string
  metadata?: {
    // Add metadata properties as needed
  }
}


export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  parentId: string | null;
  created_at: string;
  updated_at: string;
}
  