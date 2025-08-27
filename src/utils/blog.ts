import { TableOfContentsItem, ShareOptions } from '../types/blog'

/**
 * Generate table of contents from HTML content
 */
export const generateTableOfContents = (content: string): TableOfContentsItem[] => {
  const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[1-6]>/g
  const headings: TableOfContentsItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1])
    const id = match[2]
    const title = match[3].trim()

    headings.push({
      id,
      title,
      level,
      children: []
    })
  }

  // Build nested structure
  const toc: TableOfContentsItem[] = []
  const stack: TableOfContentsItem[] = []

  headings.forEach(heading => {
    // Remove items from stack that are same or lower level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      toc.push(heading)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) parent.children = []
      parent.children.push(heading)
    }

    stack.push(heading)
  })

  return toc
}

/**
 * Calculate reading time based on word count
 */
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  
  return `${minutes} min read`
}

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format date for relative time
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

/**
 * Extract excerpt from content
 */
export const extractExcerpt = (content: string, maxLength = 160): string => {
  // Remove HTML tags and markdown
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (plainText.length <= maxLength) return plainText
  
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

/**
 * Generate social sharing URLs
 */
export const generateShareUrls = (options: ShareOptions) => {
  const encodedUrl = encodeURIComponent(options.url)
  const encodedTitle = encodeURIComponent(options.title)
  const encodedDescription = encodeURIComponent(options.description || '')

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    copy: options.url
  }
}

/**
 * Generate blog post URL
 */
export const getBlogPostUrl = (slug: string): string => {
  return `/blog/${slug}`
}

/**
 * Generate category URL
 */
export const getCategoryUrl = (categorySlug: string): string => {
  return `/blog/category/${categorySlug}`
}

/**
 * Generate tag URL
 */
export const getTagUrl = (tagSlug: string): string => {
  return `/blog/tag/${tagSlug}`
}

/**
 * Parse search query parameters
 */
export const parseSearchParams = (searchParams: URLSearchParams) => {
  return {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || [],
    sortBy: (searchParams.get('sortBy') as 'publishedAt' | 'title' | 'readingTime') || 'publishedAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    page: parseInt(searchParams.get('page') || '1', 10)
  }
}

/**
 * Create search query string
 */
export const createSearchQueryString = (filters: any): string => {
  const params = new URLSearchParams()

  if (filters.search) params.set('search', filters.search)
  if (filters.category) params.set('category', filters.category)
  if (filters.tags?.length) params.set('tags', filters.tags.join(','))
  if (filters.sortBy && filters.sortBy !== 'publishedAt') params.set('sortBy', filters.sortBy)
  if (filters.sortOrder && filters.sortOrder !== 'desc') params.set('sortOrder', filters.sortOrder)
  if (filters.page && filters.page > 1) params.set('page', filters.page.toString())

  return params.toString()
}

/**
 * Paginate array of items
 */
export const paginateItems = <T>(items: T[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = items.slice(startIndex, endIndex)
  
  return {
    items: paginatedItems,
    currentPage: page,
    totalPages: Math.ceil(items.length / itemsPerPage),
    totalItems: items.length,
    hasNextPage: endIndex < items.length,
    hasPreviousPage: page > 1,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, items.length)
  }
}

/**
 * Generate SEO-friendly slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}