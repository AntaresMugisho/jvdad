export interface authType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface posetCreatType {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  tags: [string];
  image: string;
  category: string;
  status: string;
  author: number;
}
