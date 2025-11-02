import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MDXProvider } from '@mdx-js/react'
import { loadBlogPost, getRelatedPosts, type LoadedBlogPost } from '../data/blogIndex'
import { mdxComponents } from '../components/blog/MDXContent'
import ReadingProgress from '../components/blog/ReadingProgress'
import TableOfContents from '../components/blog/TableOfContents'
import SocialShare from '../components/blog/SocialShare'
import AuthorBio from '../components/blog/AuthorBio'
import RelatedPosts from '../components/blog/RelatedPosts'
import { formatDate, generateShareUrls } from '../utils/blog'
import { updateDocumentHead, cleanupSEO } from '../utils/seo'
import type { TableOfContentsItem } from '../types/blog'
import { LoadingSpinner } from '../components/ui'

type MDXComponent = React.ComponentType<Record<string, unknown>>

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const buildTableOfContents = (): TableOfContentsItem[] => {
  const container = document.querySelector('[data-article-body]')

  if (!container) {
    return []
  }

  const headings = Array.from(
    container.querySelectorAll<HTMLElement>('h2, h3, h4')
  )

  const toc: TableOfContentsItem[] = []
  let currentLevelTwo: TableOfContentsItem | null = null
  let currentLevelThree: TableOfContentsItem | null = null

  headings.forEach(heading => {
    const level = Number(heading.tagName.replace('H', ''))
    const text = heading.textContent?.trim() ?? ''

    if (!text) {
      return
    }

    if (![2, 3, 4].includes(level)) {
      return
    }

    if (!heading.id) {
      heading.id = createSlug(text)
    }

    const item: TableOfContentsItem = {
      id: heading.id,
      title: text,
      level,
      children: []
    }

    if (level === 2) {
      toc.push(item)
      currentLevelTwo = item
      currentLevelThree = null
    } else if (level === 3) {
      if (!currentLevelTwo) {
        toc.push(item)
        currentLevelTwo = item
      } else {
        currentLevelTwo.children = currentLevelTwo.children || []
        currentLevelTwo.children.push(item)
      }
      currentLevelThree = item
    } else {
      if (currentLevelThree) {
        currentLevelThree.children = currentLevelThree.children || []
        currentLevelThree.children.push(item)
      } else if (currentLevelTwo) {
        currentLevelTwo.children = currentLevelTwo.children || []
        currentLevelTwo.children.push(item)
      } else {
        toc.push(item)
      }
    }
  })

  return toc
}

const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tocItems, setTocItems] = useState<TableOfContentsItem[]>([])
  const [relatedPosts, setRelatedPosts] = useState<ReturnType<typeof getRelatedPosts>>([])
  const [MDXContent, setMDXContent] = useState<MDXComponent | null>(null)
  const [post, setPost] = useState<LoadedBlogPost['post'] | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchArticle = async () => {
      if (!slug) {
        setError('Article not found')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      const result = await loadBlogPost(slug)

      if (!mounted) {
        return
      }

      if (!result) {
        setError('Article not found')
        setIsLoading(false)
        return
      }

      setPost(result.post)
      setMDXContent(() => result.Content)
      setRelatedPosts(getRelatedPosts(slug, 3))
      setIsLoading(false)
    }

    fetchArticle()

    return () => {
      mounted = false
    }
  }, [slug])

  useEffect(() => {
    if (!post) {
      return
    }

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const canonicalUrl = `${baseUrl}/blog/${post.slug}`
    const ogImage =
      post.image?.url && post.image.url.startsWith('http')
        ? post.image.url
        : post.image?.url
        ? `${baseUrl}${post.image.url}`
        : undefined

    updateDocumentHead({
      title: post.seo?.title || `${post.title} | ${post.author.name}`,
      description: post.seo?.description || post.description,
      keywords: post.seo?.keywords || post.tags,
      canonicalUrl,
      ogImage,
      ogType: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      author: post.author.name,
      section: post.category.name,
      tags: post.tags
    })

    return () => {
      cleanupSEO()
    }
  }, [post])

  useEffect(() => {
    if (!MDXContent) {
      return
    }

    const timer = window.setTimeout(() => {
      setTocItems(buildTableOfContents())
    }, 120)

    return () => {
      window.clearTimeout(timer)
    }
  }, [MDXContent, post?.slug])

  const shareUrls = useMemo(() => {
    if (!post || typeof window === 'undefined') {
      return null
    }

    return generateShareUrls({
      title: post.title,
      url: `${window.location.origin}/blog/${post.slug}`,
      description: post.excerpt
    })
  }, [post])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !post || !MDXContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          className="max-w-md text-center space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-secondary-900">{error || 'Article not found'}</h1>
          <p className="text-secondary-600">
            The article you’re looking for is no longer available. Explore other insights instead.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary"
              type="button"
            >
              Go back
            </button>
            <Link to="/blog" className="btn-primary">
              Browse the blog
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <ReadingProgress />

      <article className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
        <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-16">
          <div className="container-width section-padding">
            <motion.div
              className="max-w-5xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center text-indigo-200 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to articles
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-100">
                <span className={`${post.category.color} text-white px-3 py-1 rounded-full font-semibold`}>
                  {post.category.icon} {post.category.name}
                </span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true">•</span>
                <span>{post.readingTime}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">{post.title}</h1>
                {post.subtitle && (
                  <p className="text-lg md:text-xl text-indigo-100 max-w-3xl">{post.subtitle}</p>
                )}
              </div>

              {shareUrls && (
                <SocialShare shareUrls={shareUrls} title={post.title} />
              )}
            </motion.div>
          </div>
        </header>

        <section className="container-width section-padding py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_minmax(0,1fr)] gap-12 lg:gap-16">
            <div>
              {post.image && (
                <motion.figure
                  className="mb-10 rounded-3xl overflow-hidden shadow-xl"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={post.image.url}
                    alt={post.image.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {post.image.caption && (
                    <figcaption className="px-6 py-4 text-sm text-secondary-500 bg-secondary-50">
                      {post.image.caption}
                    </figcaption>
                  )}
                </motion.figure>
              )}

              <motion.div
                className="prose prose-lg prose-slate max-w-none blog-article-content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MDXProvider components={mdxComponents}>
                  <div data-article-body>
                    <MDXContent />
                  </div>
                </MDXProvider>
              </motion.div>

              <motion.div
                className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-secondary-200 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="text-sm text-secondary-500">
                  Published on {formatDate(post.publishedAt)}
                </div>

                {shareUrls && (
                  <SocialShare shareUrls={shareUrls} title={post.title} compact />
                )}
              </motion.div>

              <div className="mt-12">
                <AuthorBio
                  author={{
                    name: post.author.name,
                    bio: post.author.bio || 'Software engineer and AI builder crafting human-centered systems.',
                    avatar: post.author.avatar
                  }}
                />
              </div>

              <div className="mt-16">
                <RelatedPosts posts={relatedPosts} />
              </div>
            </div>

            <aside className="space-y-8">
              <TableOfContents items={tocItems} />

              <div className="card">
                <h3 className="text-sm font-semibold text-secondary-900 mb-3 uppercase tracking-wide">
                  Share this article
                </h3>
                {shareUrls && <SocialShare shareUrls={shareUrls} title={post.title} vertical />}
              </div>

              <div className="card">
                <h3 className="text-sm font-semibold text-secondary-900 mb-3 uppercase tracking-wide">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </>
  )
}

export default BlogArticle
