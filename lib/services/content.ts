import { galleryApi, projectsApi, testimonialsApi, blogAPI } from '@/lib/api'
import { GalleryImage, Post, Project } from '@/lib/types'
import { Testimonial } from '@/lib/types/testimonial'

type ProjectResponse = {
  id: string | number
  title: string
  description: string
  image?: string
  tags?: string[]
}

type PostResponse = {
  id: string | number
  title: string
  excerpt?: string
  date?: string
  image?: string
  tags?: string[]
  author?: string
  content?: any
}

type GalleryResponse = {
  id: string | number
  image: string
  alt?: string
  category?: string
}

type TestimonialResponse = {
  id: string | number
  name: string
  role?: string
  organization?: string
  content: string
  avatar?: string
  location?: string
}

const DEFAULT_PROJECT_IMAGE = '/images/3.jpeg'
const DEFAULT_POST_IMAGE = '/images/1.jpeg'

const mapProject = (project: ProjectResponse): Project => ({
  id: String(project.id),
  title: project.title,
  description: project.description,
  image: project.image ?? DEFAULT_PROJECT_IMAGE,
  tags: project.tags ?? [],
})

const mapPost = (post: PostResponse): Post => ({
  id: String(post.id),
  title: post.title,
  excerpt: post.excerpt ?? '',
  date: post.date ?? new Date().toISOString(),
  image: post.image ?? DEFAULT_POST_IMAGE,
  tags: post.tags ?? [],
  author: post.author,
  content: post.content,
})

const mapGalleryItem = (item: GalleryResponse): GalleryImage => ({
  id: String(item.id),
  src: item.image,
  alt: item.alt ?? 'Image de la galerie',
  category: item.category,
})

const mapTestimonial = (testimonial: TestimonialResponse): Testimonial => ({
  id: String(testimonial.id),
  name: testimonial.name,
  role: testimonial.role ?? 'Participant',
  organization: testimonial.organization,
  content: testimonial.content,
  avatar: testimonial.avatar,
  location: testimonial.location,
})

export const contentService = {
  async getProjects(): Promise<Project[]> {
    const data = await projectsApi.list()
    if (Array.isArray(data)) {
      return data.map(mapProject)
    }
    return []
  },

  async getProjectById(id: string): Promise<Project | undefined> {
    try {
      const data = await projectsApi.detail(id)
      return mapProject(data)
    } catch (error) {
      console.error('Failed to fetch project detail', error)
      return undefined
    }
  },

  async getPosts(): Promise<Post[]> {
    const data = await blogAPI.list()
    if (Array.isArray(data)) {
      return data.map(mapPost)
    }
    if (Array.isArray(data?.results)) {
      return data.results.map(mapPost)
    }
    return []
  },

  async getPostById(id: string): Promise<Post | undefined> {
    try {
      const response = await blogAPI.detail(id)
      const data = response.data ?? response
      return mapPost(data)
    } catch (error) {
      console.error('Failed to fetch post detail', error)
      return undefined
    }
  },

  async getGallery(): Promise<GalleryImage[]> {
    const data = await galleryApi.list()
    if (Array.isArray(data)) {
      return data.map(mapGalleryItem)
    }
    return []
  },

  async getTestimonials(): Promise<Testimonial[]> {
    const data = await testimonialsApi.list()
    if (Array.isArray(data)) {
      return data.map(mapTestimonial)
    }
    return []
  },
}
