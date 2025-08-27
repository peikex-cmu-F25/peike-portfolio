import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BlogPost } from '../../types/blog'
import { formatDate, getBlogPostUrl } from '../../utils/blog'
import { blogCategories } from '../../data/blog'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const category = blogCategories.find(cat => cat.slug === post.category)

  return (
    <motion.article
      className="card group hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to={getBlogPostUrl(post.slug)} className="block">
        {/* Featured Image */}
        {post.image && (
          <div className="relative overflow-hidden rounded-t-xl -m-6 mb-6">
            <img
              src={post.image.url}
              alt={post.image.alt}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              </div>
            )}
            {category && (
              <div className="absolute top-4 right-4">
                <span className={`${category.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {category.icon} {category.name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="space-y-4">
          {/* Category and Date */}
          <div className="flex items-center justify-between text-sm text-secondary-500">
            <div className="flex items-center gap-2">
              {!post.image && category && (
                <span className={`${category.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                  {category.icon} {category.name}
                </span>
              )}
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <span>{post.readingTime}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-secondary-600 line-clamp-3">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-secondary-100">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-secondary-900">{post.author.name}</p>
              <p className="text-xs text-secondary-500 line-clamp-1">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogCard