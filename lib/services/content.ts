import { Project, Post, GalleryImage } from '@/lib/types'
import { Testimonial } from '@/lib/types/testimonial'
import { projects } from '@/lib/data/projects'
import { posts } from '@/lib/data/posts'
import { gallery } from '@/lib/data/gallery'
import { testimonials } from '@/lib/data/testimonials'

export const contentService = {
  async getProjects(): Promise<Project[]> {
    return projects
  },
  async getPosts(): Promise<Post[]> {
    return posts
  },
  async getPostById(id: string): Promise<Post | undefined> {
    return posts.find(post => post.id === id)
  },
  async getGallery(): Promise<GalleryImage[]> {
    return gallery
  },
  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials
  },
}
