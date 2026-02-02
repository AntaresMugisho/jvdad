export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string
  tags: string[];
  content: any;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = "asbl-blog-posts";

export const blogStorage = {
  getPosts: (): BlogPost[] => {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  },

  getPost: (id: string): BlogPost | undefined => {
    const posts = blogStorage.getPosts();
    return posts.find((post) => post.id === id);
  },

  createPost: (post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): BlogPost => {
    const posts = blogStorage.getPosts();
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  updatePost: (id: string, updates: Partial<BlogPost>): BlogPost | undefined => {
    const posts = blogStorage.getPosts();
    const index = posts.findIndex((post) => post.id === id);
    if (index === -1) return undefined;

    const updatedPost = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    posts[index] = updatedPost;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return updatedPost;
  },

  deletePost: (id: string): boolean => {
    const posts = blogStorage.getPosts();
    const filtered = posts.filter((post) => post.id !== id);
    if (filtered.length === posts.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};
