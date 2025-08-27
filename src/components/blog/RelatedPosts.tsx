import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RelatedPost } from '../../types/blog'
import { formatDate, getBlogPostUrl } from '../../utils/blog'

interface RelatedPostsProps {
  posts: RelatedPost[]
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null

  return (
    <section className="border-t border-secondary-200 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-secondary-900 mb-8">Related Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={getBlogPostUrl(post.slug)}
                className="block card hover:shadow-xl transition-all duration-300"
              >
                {/* Featured Image */}
                {post.image && (
                  <div className="relative overflow-hidden rounded-lg -m-6 mb-6">
                    <img
                      src={post.image.url}
                      alt={post.image.alt}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-secondary-500">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span>{post.readingTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary-600 text-sm line-clamp-3">
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors duration-200">
                    Read more
                    <svg 
                      className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            View all articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default RelatedPosts