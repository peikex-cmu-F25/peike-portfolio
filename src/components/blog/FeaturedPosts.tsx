import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BlogPost } from '../../types/blog'
import { formatDate, getBlogPostUrl } from '../../utils/blog'
import { blogCategories } from '../../data/blog'

interface FeaturedPostsProps {
  posts: BlogPost[]
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null

  const [mainPost, ...otherPosts] = posts

  return (
    <section className="mb-16">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Featured Articles</h2>
        <p className="text-secondary-600">Handpicked insights on the latest in tech and AI</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Post */}
        {mainPost && (
          <motion.article 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link 
              to={getBlogPostUrl(mainPost.slug)}
              className="group block card hover:shadow-3xl transition-all duration-500 p-0 overflow-hidden"
            >
              {mainPost.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={mainPost.image.url}
                    alt={mainPost.image.alt}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  {blogCategories.find(cat => cat.slug === mainPost.category) && (
                    <div className="absolute top-4 left-4">
                      <span className={`${blogCategories.find(cat => cat.slug === mainPost.category)?.color} text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm`}>
                        {blogCategories.find(cat => cat.slug === mainPost.category)?.icon} 
                        {blogCategories.find(cat => cat.slug === mainPost.category)?.name}
                      </span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      ⭐ Featured
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-4 mb-3 text-sm opacity-90">
                      <time dateTime={mainPost.publishedAt}>
                        {formatDate(mainPost.publishedAt)}
                      </time>
                      <span>{mainPost.readingTime}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-primary-200 transition-colors duration-300">
                      {mainPost.title}
                    </h3>
                    <p className="text-secondary-100 opacity-90 line-clamp-2">
                      {mainPost.description}
                    </p>
                  </div>
                </div>
              )}

              {!mainPost.image && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-secondary-500">
                      {blogCategories.find(cat => cat.slug === mainPost.category) && (
                        <span className={`${blogCategories.find(cat => cat.slug === mainPost.category)?.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                          {blogCategories.find(cat => cat.slug === mainPost.category)?.icon} 
                          {blogCategories.find(cat => cat.slug === mainPost.category)?.name}
                        </span>
                      )}
                      <time dateTime={mainPost.publishedAt}>
                        {formatDate(mainPost.publishedAt)}
                      </time>
                    </div>
                    <span className="text-sm text-secondary-500">{mainPost.readingTime}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {mainPost.title}
                  </h3>
                  
                  <p className="text-secondary-600 mb-6 line-clamp-3">
                    {mainPost.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {mainPost.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 bg-secondary-100 text-secondary-600 text-sm rounded-full group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          </motion.article>
        )}

        {/* Other Featured Posts */}
        <div className="space-y-6">
          {otherPosts.slice(0, 2).map((post, index) => {
            const category = blogCategories.find(cat => cat.slug === post.category)
            
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link 
                  to={getBlogPostUrl(post.slug)}
                  className="group block card hover:shadow-xl transition-all duration-300"
                >
                  {post.image ? (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={post.image.url}
                          alt={post.image.alt}
                          className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-secondary-500">
                          {category && (
                            <span className={`${category.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                              {category.icon}
                            </span>
                          )}
                          <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                          </time>
                          <span>{post.readingTime}</span>
                        </div>
                        <h3 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-secondary-600 line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-secondary-500">
                        <div className="flex items-center gap-2">
                          {category && (
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
                      
                      <h3 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-secondary-600 line-clamp-2">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedPosts