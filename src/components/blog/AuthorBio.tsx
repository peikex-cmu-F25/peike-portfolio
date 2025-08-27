import React from 'react'
import { motion } from 'framer-motion'

interface Author {
  name: string
  bio: string
  avatar?: string
}

interface AuthorBioProps {
  author: Author
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  return (
    <motion.div 
      className="card bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
              {author.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-secondary-900">
              {author.name}
            </h3>
            <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              Author
            </span>
          </div>
          
          <p className="text-secondary-600 leading-relaxed mb-4">
            {author.bio}
          </p>

          {/* Social Links / Contact - Could be extended in the future */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/peike-portfolio/contact"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in touch
            </a>
            <a
              href="/peike-portfolio/projects"
              className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View projects
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthorBio