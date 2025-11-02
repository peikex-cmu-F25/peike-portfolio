import type { ComponentType } from 'react'
import { BlogPost, BlogCategory, RelatedPost } from '../types/blog'
import { blogArticles, personalInfo } from './portfolio'
import { generateSlug } from '../utils/blog'

type MdxModule = {
  default: ComponentType<Record<string, unknown>>
  meta?: Record<string, unknown>
}

const mdxModules = import.meta.glob('../content/blog/*.mdx')

const slugToModule = Object.entries(mdxModules).reduce<Record<string, () => Promise<MdxModule>>>(
  (acc, [path, loader]) => {
    const slug = path.split('/').pop()?.replace('.mdx', '')
    if (slug) {
      acc[slug] = loader as unknown as () => Promise<MdxModule>
    }
    return acc
  },
  {}
)

const CATEGORY_BASE: BlogCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & ML',
    slug: 'ai-ml',
    description: 'Applied machine learning, RAG, and production AI systems',
    color: 'bg-blue-500',
    icon: '🤖'
  },
  {
    id: 'system-design',
    name: 'System Design',
    slug: 'system-design',
    description: 'Architecture decisions, performance, and scalability patterns',
    color: 'bg-purple-500',
    icon: '🧱'
  },
  {
    id: 'engineering',
    name: 'Engineering Process',
    slug: 'engineering',
    description: 'Developer experience, optimization, and delivery craft',
    color: 'bg-emerald-500',
    icon: '🛠️'
  }
]

const defaultAuthor = {
  name: personalInfo.name,
  title: personalInfo.title,
  bio: personalInfo.tagline,
  avatar: personalInfo.profileImage,
  link: personalInfo.linkedin
}

const normaliseCategory = (label: string) => {
  const slug = generateSlug(label)
  const base = CATEGORY_BASE.find(category => category.slug === slug)

  if (base) {
    return base
  }

  return {
    id: slug,
    name: label,
    slug,
    description: label,
    color: 'bg-secondary-500',
    icon: '✦'
  }
}

const BLOG_POSTS: BlogPost[] = blogArticles.map(article => {
  const category = normaliseCategory(article.category)
  const imageUrl = article.image || ''

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    description: article.description,
    excerpt: article.excerpt,
    author: {
      ...defaultAuthor,
      name: article.author || defaultAuthor.name
    },
    publishedAt: article.publishDate,
    readingTime: article.readTime.toLowerCase().includes('read')
      ? article.readTime
      : `${article.readTime} read`,
    tags: article.tags,
    category: {
      slug: category.slug,
      name: category.name,
      color: category.color,
      icon: category.icon
    },
    featured: article.featured,
    image: imageUrl
      ? {
          url: imageUrl,
          alt: `${article.title} hero image`
        }
      : undefined,
    seo: {
      title: `${article.title} | ${personalInfo.name}`,
      description: article.description,
      keywords: article.tags
    }
  }
})

const sortByPublishedDate = (posts: BlogPost[]) =>
  [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

export const listBlogPosts = () => sortByPublishedDate(BLOG_POSTS)

export const listFeaturedPosts = () => sortByPublishedDate(BLOG_POSTS.filter(post => post.featured))

export const getBlogPostMeta = (slug: string) => BLOG_POSTS.find(post => post.slug === slug)

export interface LoadedBlogPost {
  post: BlogPost
  Content: ComponentType<Record<string, unknown>>
}

export const loadBlogPost = async (slug: string): Promise<LoadedBlogPost | null> => {
  const post = getBlogPostMeta(slug)
  if (!post) {
    return null
  }

  const loader = slugToModule[slug]
  if (!loader) {
    return null
  }

  const module = await loader()

  return {
    post,
    Content: module.default
  }
}

export const getRelatedPosts = (slug: string, limit = 3): RelatedPost[] => {
  const current = getBlogPostMeta(slug)
  if (!current) return []

  const matches = sortByPublishedDate(
    BLOG_POSTS.filter(
      post =>
        post.slug !== slug &&
        (post.category.slug === current.category.slug ||
          post.tags.some(tag => current.tags.includes(tag)))
    )
  ).slice(0, limit)

  return matches.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.excerpt,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    image: post.image
  }))
}

export const getBlogCategories = (): BlogCategory[] => {
  const categoriesBySlug = new Map<string, BlogCategory>()

  BLOG_POSTS.forEach(post => {
    if (!categoriesBySlug.has(post.category.slug)) {
      categoriesBySlug.set(post.category.slug, {
        id: post.category.slug,
        slug: post.category.slug,
        name: post.category.name,
        description: '',
        color: post.category.color,
        icon: post.category.icon
      })
    }
  })

  CATEGORY_BASE.forEach(category => {
    if (!categoriesBySlug.has(category.slug)) {
      categoriesBySlug.set(category.slug, category)
    }
  })

  return Array.from(categoriesBySlug.values())
}
