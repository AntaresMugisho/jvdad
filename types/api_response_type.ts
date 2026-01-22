export interface registerApiResponse {
  user: { id: number; name: string; email: string };
  token: string;
  token_type: string;
}

export interface getAllPostsResType {
  data: [];
  current_page: number;
  total: number;
}

export interface categoiesResponseApi {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  posts_count: number;
  created_at: string;
  updated_at: string;
}
