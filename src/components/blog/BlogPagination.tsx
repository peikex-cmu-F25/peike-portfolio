import React from 'react'
import { motion } from 'framer-motion'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
  startIndex?: number
  endIndex?: number
  totalItems?: number
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = false,
  startIndex,
  endIndex,
  totalItems
}) => {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Pagination Info */}
      {showInfo && startIndex && endIndex && totalItems && (
        <motion.p 
          className="text-sm text-secondary-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Showing <span className="font-medium">{startIndex}</span> to{' '}
          <span className="font-medium">{endIndex}</span> of{' '}
          <span className="font-medium">{totalItems}</span> articles
        </motion.p>
      )}

      {/* Pagination Controls */}
      <nav className="flex items-center space-x-2" aria-label="Pagination">
        {/* Previous Button */}
        <motion.button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            currentPage === 1
              ? 'text-secondary-400 cursor-not-allowed'
              : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
          }`}
          whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={index} className="px-3 py-2 text-secondary-500">
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isCurrentPage = pageNumber === currentPage

            return (
              <motion.button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isCurrentPage
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                whileHover={!isCurrentPage ? { scale: 1.1 } : {}}
                whileTap={!isCurrentPage ? { scale: 0.95 } : {}}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNumber}
              </motion.button>
            )
          })}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            currentPage === totalPages
              ? 'text-secondary-400 cursor-not-allowed'
              : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
          }`}
          whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </nav>
    </div>
  )
}

export default BlogPagination