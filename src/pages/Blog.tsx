import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { listBlogPosts } from '../data/blogIndex'
import type { BlogPost } from '../types/blog'
import { formatDate } from '../utils/blog'
import { generateBlogListingSEO, updateDocumentHead, cleanupSEO } from '../utils/seo'

const Blog: React.FC = () => {
  const posts = useMemo(() => listBlogPosts(), [])
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap(post => post.tags))).sort((a, b) => a.localeCompare(b)),
    [posts]
  )

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return posts.filter(post => {
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag))

      const matchesSearch =
        query.length === 0 ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)

      return matchesTags && matchesSearch
    })
  }, [posts, selectedTags, searchQuery])

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(selected => selected !== tag) : [...prev, tag]
    )
  }

  const renderPostCard = (post: BlogPost) => (
    <motion.article
      key={post.slug}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
        {post.image && (
          <div className="relative overflow-hidden">
            <img
              src={post.image.url}
              alt={post.image.alt}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span
                className={`${post.category.color} text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm`}
              >
                {post.category.icon} {post.category.name}
              </span>
              {post.featured && (
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  Featured
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 p-6 space-y-4">
          {!post.image && (
            <div className="flex items-center gap-2 text-xs">
              <span className={`${post.category.color} text-white px-2 py-1 rounded-full font-semibold`}>
                {post.category.icon} {post.category.name}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-secondary-500 uppercase tracking-wide">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>{post.readingTime}</span>
          </div>

          <h3 className="text-xl font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
            {post.title}
          </h3>

          {post.subtitle && <p className="text-secondary-600 line-clamp-2">{post.subtitle}</p>}

          <p className="text-secondary-600 line-clamp-3">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-600"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      <section className="section-padding py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Technical Blog</h1>
            <p className="text-xl text-primary-100 mb-8">
              Field notes from building production AI systems, scalable web architectures, and
              delightful engineering workflows.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-12">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              className="w-full px-6 py-4 text-lg border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-700"
            />

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">Filter by topics</h2>
              <div className="flex flex-wrap gap-3">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                    type="button"
                  >
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className="px-4 py-2 rounded-full text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="section-padding pb-12">
          <div className="container-width">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Featured articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map(post => renderPostCard(post))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding pb-24">
        <div className="container-width">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-secondary-900">All articles</h2>
            <span className="text-secondary-500 text-sm">{filteredPosts.length} posts</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-2xl shadow-md p-12 text-center">
              <h3 className="text-2xl font-semibold text-secondary-900 mb-3">
                No articles match your filters
              </h3>
              <p className="text-secondary-600">
                Try adjusting your search or clearing selected tags to explore more posts.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{regularPosts.map(post => renderPostCard(post))}</div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog
