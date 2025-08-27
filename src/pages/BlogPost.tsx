import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BlogPost as BlogPostType } from '../types/blog'
import { getBlogPost, getRelatedPosts } from '../data/blog'
import { formatDate, formatRelativeTime, generateShareUrls } from '../utils/blog'
import { blogCategories } from '../data/blog'
import MDXContent from '../components/blog/MDXContent'
import ReadingProgress from '../components/blog/ReadingProgress'
import TableOfContents from '../components/blog/TableOfContents'
import SocialShare from '../components/blog/SocialShare'
import AuthorBio from '../components/blog/AuthorBio'
import RelatedPosts from '../components/blog/RelatedPosts'
import Breadcrumbs from '../components/blog/Breadcrumbs'
import { LoadingSpinner } from '../components/ui'

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      navigate('/blog')
      return
    }

    try {
      setLoading(true)
      const foundPost = getBlogPost(slug)
      
      if (!foundPost) {
        setError('Article not found')
        return
      }

      setPost(foundPost)
      
      // Update document title and meta description
      document.title = `${foundPost.title} | Peike Xu`
      if (foundPost.seo?.description) {
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute('content', foundPost.seo.description)
        }
      }
    } catch (err) {
      setError('Failed to load article')
    } finally {
      setLoading(false)
    }
  }, [slug, navigate])

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            {error || 'Article Not Found'}
          </h1>
          <p className="text-secondary-600 mb-8">
            {error === 'Article not found' 
              ? "The article you're looking for doesn't exist or may have been moved."
              : "Something went wrong while loading the article."
            }
          </p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </motion.div>
      </div>
    )
  }

  const category = blogCategories.find(cat => cat.slug === post.category)
  const relatedPosts = getRelatedPosts(post)
  const shareUrls = generateShareUrls({
    title: post.title,
    url: window.location.href,
    description: post.description
  })

  return (
    <>
      {/* Reading Progress */}
      <ReadingProgress />

      <article className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 pt-20">
        <div className="container-width section-padding">
          {/* Breadcrumbs */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Breadcrumbs 
              items={[
                { label: 'Blog', href: '/blog' },
                { label: category?.name || 'Article', href: `/blog/category/${post.category}` },
                { label: post.title, href: `/blog/${post.slug}`, current: true }
              ]} 
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Header */}
              <header className="mb-12">
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Category and Meta */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      {category && (
                        <Link 
                          to={`/blog/category/${category.slug}`}
                          className={`${category.color} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity duration-200`}
                        >
                          {category.icon} {category.name}
                        </Link>
                      )}
                      <time 
                        dateTime={post.publishedAt}
                        className="text-secondary-500 font-medium"
                        title={formatDate(post.publishedAt)}
                      >
                        {formatRelativeTime(post.publishedAt)}
                      </time>
                    </div>
                    <div className="text-secondary-500 font-medium">
                      {post.readingTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                    {post.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-secondary-600 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog/tag/${tag}`}
                        className="inline-block px-3 py-1 bg-secondary-100 text-secondary-600 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  {/* Share Buttons */}
                  <SocialShare shareUrls={shareUrls} title={post.title} />
                </motion.div>

                {/* Featured Image */}
                {post.image && (
                  <motion.div 
                    className="mt-12 -mx-4 sm:-mx-8 lg:-mx-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <figure>
                      <img
                        src={post.image.url}
                        alt={post.image.alt}
                        className="w-full h-64 sm:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
                      />
                      {post.image.caption && (
                        <figcaption className="mt-4 text-center text-sm text-secondary-500 italic">
                          {post.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  </motion.div>
                )}
              </header>

              {/* Article Content */}
              <motion.div 
                className="prose prose-lg prose-secondary max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MDXContent content={post.content} />
              </motion.div>

              {/* Article Footer */}
              <motion.footer 
                className="mt-16 pt-8 border-t border-secondary-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="text-sm text-secondary-500">
                    Published on {formatDate(post.publishedAt)}
                    {post.updatedAt && post.updatedAt !== post.publishedAt && (
                      <span> • Updated on {formatDate(post.updatedAt)}</span>
                    )}
                  </div>
                  <SocialShare 
                    shareUrls={shareUrls} 
                    title={post.title}
                    compact 
                  />
                </div>
              </motion.footer>

              {/* Author Bio */}
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <AuthorBio author={post.author} />
              </motion.div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <motion.div 
                  className="mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <RelatedPosts posts={relatedPosts} />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <TableOfContents items={post.tableOfContents} />
                  </motion.div>
                )}

                {/* Quick Share */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="card">
                    <h3 className="font-semibold text-secondary-900 mb-4">Share this article</h3>
                    <SocialShare 
                      shareUrls={shareUrls} 
                      title={post.title}
                      vertical 
                    />
                  </div>
                </motion.div>

                {/* Back to Blog */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link 
                    to="/blog"
                    className="block w-full btn-secondary text-center"
                  >
                    ← Back to Blog
                  </Link>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogPost