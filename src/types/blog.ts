export interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle?: string
  description: string
  excerpt: string
  author: {
    name: string
    title?: string
    bio?: string
    avatar?: string
    link?: string
  }
  publishedAt: string
  updatedAt?: string
  readingTime: string
  tags: string[]
  category: {
    slug: string
    name: string
    color: string
    icon?: string
  }
  featured: boolean
  image?: {
    url: string
    alt: string
    caption?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  tableOfContents?: TableOfContentsItem[]
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon?: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  count: number
}

export interface BlogFilters {
  search?: string
  category?: string
  tags?: string[]
  sortBy?: 'publishedAt' | 'title' | 'readingTime'
  sortOrder?: 'asc' | 'desc'
}

export interface BlogMetadata {
  totalPosts: number
  categories: BlogCategory[]
  tags: BlogTag[]
  featuredPosts: BlogPost[]
  recentPosts: BlogPost[]
}

export interface RelatedPost {
  id: string
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: string
  image?: {
    url: string
    alt: string
  }
}

export interface ShareOptions {
  title: string
  url: string
  description?: string
}
