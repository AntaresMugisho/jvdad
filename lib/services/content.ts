import { Project, Post, GalleryImage } from '@/lib/types'
import { projects } from '@/lib/data/projects'
import { posts } from '@/lib/data/posts'
import { gallery } from '@/lib/data/gallery'

export const contentService = {
  async getProjects(): Promise<Project[]> {
    return projects
  },
  async getPosts(): Promise<Post[]> {
    return posts
  },
  async getGallery(): Promise<GalleryImage[]> {
    return gallery
  },
}
