import { BlogPost } from '../types/blog'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export const updateDocumentHead = (config: SEOConfig) => {
  // Update document title
  document.title = config.title

  // Update or create meta tags
  updateMetaTag('description', config.description)
  
  if (config.keywords?.length) {
    updateMetaTag('keywords', config.keywords.join(', '))
  }

  if (config.author) {
    updateMetaTag('author', config.author)
  }

  // Open Graph tags
  updateMetaProperty('og:title', config.title)
  updateMetaProperty('og:description', config.description)
  updateMetaProperty('og:type', config.ogType || 'website')
  
  if (config.canonicalUrl) {
    updateMetaProperty('og:url', config.canonicalUrl)
    updateCanonicalLink(config.canonicalUrl)
  }
  
  if (config.ogImage) {
    updateMetaProperty('og:image', config.ogImage)
    updateMetaProperty('og:image:alt', config.title)
  }

  // Article-specific Open Graph tags
  if (config.ogType === 'article') {
    if (config.publishedTime) {
      updateMetaProperty('article:published_time', config.publishedTime)
    }
    if (config.modifiedTime) {
      updateMetaProperty('article:modified_time', config.modifiedTime)
    }
    if (config.author) {
      updateMetaProperty('article:author', config.author)
    }
    if (config.section) {
      updateMetaProperty('article:section', config.section)
    }
    if (config.tags?.length) {
      // Remove existing article:tag meta tags
      const existingTags = document.querySelectorAll('meta[property="article:tag"]')
      existingTags.forEach(tag => tag.remove())
      
      // Add new article:tag meta tags
      config.tags.forEach(tag => {
        updateMetaProperty('article:tag', tag)
      })
    }
  }

  // Twitter Card tags
  updateMetaName('twitter:card', 'summary_large_image')
  updateMetaName('twitter:title', config.title)
  updateMetaName('twitter:description', config.description)
  
  if (config.ogImage) {
    updateMetaName('twitter:image', config.ogImage)
  }

  // JSON-LD structured data for articles
  if (config.ogType === 'article') {
    updateStructuredData(config)
  }
}

const updateMetaTag = (name: string, content: string) => {
  let metaTag = document.querySelector(`meta[name="${name}"]`)
  
  if (!metaTag) {
    metaTag = document.createElement('meta')
    metaTag.setAttribute('name', name)
    document.head.appendChild(metaTag)
  }
  
  metaTag.setAttribute('content', content)
}

const updateMetaProperty = (property: string, content: string) => {
  let metaTag = document.querySelector(`meta[property="${property}"]`)
  
  if (!metaTag) {
    metaTag = document.createElement('meta')
    metaTag.setAttribute('property', property)
    document.head.appendChild(metaTag)
  }
  
  metaTag.setAttribute('content', content)
}

const updateMetaName = (name: string, content: string) => {
  let metaTag = document.querySelector(`meta[name="${name}"]`)
  
  if (!metaTag) {
    metaTag = document.createElement('meta')
    metaTag.setAttribute('name', name)
    document.head.appendChild(metaTag)
  }
  
  metaTag.setAttribute('content', content)
}

const updateCanonicalLink = (url: string) => {
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  
  canonicalLink.setAttribute('href', url)
}

const updateStructuredData = (config: SEOConfig) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]')
  if (existingScript) {
    existingScript.remove()
  }

  // Create new structured data
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    author: {
      '@type': 'Person',
      name: config.author || 'Peike Xu'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Peike Xu Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/images/logo.png`
      }
    },
    datePublished: config.publishedTime,
    dateModified: config.modifiedTime || config.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.canonicalUrl
    }
  }

  if (config.ogImage) {
    structuredData['image'] = {
      '@type': 'ImageObject',
      url: config.ogImage,
      width: 1200,
      height: 630
    }
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(structuredData)
  document.head.appendChild(script)
}

// Generate SEO config from blog post
export const generateBlogPostSEO = (post: BlogPost): SEOConfig => {
  const baseUrl = window.location.origin
  const postUrl = `${baseUrl}/blog/${post.slug}`
  
  return {
    title: post.seo?.title || `${post.title} | Peike Xu`,
    description: post.seo?.description || post.description,
    keywords: post.seo?.keywords || post.tags,
    canonicalUrl: postUrl,
    ogImage: post.image?.url ? `${baseUrl}${post.image.url}` : `${baseUrl}/images/og-default.jpg`,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author.name,
    section: post.category,
    tags: post.tags
  }
}

// Generate SEO config for blog listing page
export const generateBlogListingSEO = (filters?: any): SEOConfig => {
  const baseUrl = window.location.origin
  let title = 'Technical Blog | Peike Xu'
  let description = 'Deep dives into machine learning, web development, and AI research. Sharing insights from building scalable systems.'
  let canonicalUrl = `${baseUrl}/blog`

  if (filters?.category) {
    title = `${filters.category} Articles | Peike Xu`
    description = `Browse ${filters.category} articles and insights.`
    canonicalUrl += `/category/${filters.category}`
  }

  if (filters?.search) {
    title = `Search Results for "${filters.search}" | Peike Xu`
    description = `Search results for "${filters.search}" in technical articles.`
  }

  return {
    title,
    description,
    keywords: ['machine learning', 'web development', 'AI research', 'TypeScript', 'React', 'Python'],
    canonicalUrl,
    ogImage: `${baseUrl}/images/blog-og.jpg`,
    ogType: 'website'
  }
}

// Clean up SEO tags when navigating away
export const cleanupSEO = () => {
  // Remove article-specific tags
  const articleTags = document.querySelectorAll('meta[property^="article:"]')
  articleTags.forEach(tag => tag.remove())
  
  // Remove structured data
  const structuredData = document.querySelector('script[type="application/ld+json"]')
  if (structuredData) {
    structuredData.remove()
  }
}

// Generate reading time estimate
export const estimateReadingTime = (content: string, wordsPerMinute: number = 200): string => {
  // Remove HTML tags and markdown
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const words = plainText.split(' ').length
  const minutes = Math.ceil(words / wordsPerMinute)
  
  return `${minutes} min read`
}

// Generate excerpt from content
export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  // Remove HTML tags and markdown
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (plainText.length <= maxLength) return plainText
  
  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}