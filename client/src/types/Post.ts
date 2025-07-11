export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
  published: boolean;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InsertPost {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
  published: boolean;
  authorId?: string;
}
