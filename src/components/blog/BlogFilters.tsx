import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogCategory, BlogTag } from '../../types/blog'

interface BlogFiltersProps {
  categories: BlogCategory[]
  tags: BlogTag[]
  selectedCategory: string
  selectedTags: string[]
  sortBy: 'publishedAt' | 'title' | 'readingTime'
  sortOrder: 'asc' | 'desc'
  onCategoryChange: (category: string) => void
  onTagsChange: (tags: string[]) => void
  onSortChange: (sortBy: 'publishedAt' | 'title' | 'readingTime', sortOrder: 'asc' | 'desc') => void
}

const BlogFilters: React.FC<BlogFiltersProps> = ({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  sortBy,
  sortOrder,
  onCategoryChange,
  onTagsChange,
  onSortChange
}) => {
  const [showCategories, setShowCategories] = useState(false)
  const [showTags, setShowTags] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const handleTagToggle = (tagSlug: string) => {
    const newTags = selectedTags.includes(tagSlug)
      ? selectedTags.filter(tag => tag !== tagSlug)
      : [...selectedTags, tagSlug]
    onTagsChange(newTags)
  }

  const handleSortChange = (newSortBy: typeof sortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sort order if same sort field
      onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Default to desc for new sort field
      onSortChange(newSortBy, 'desc')
    }
  }

  const getSortLabel = () => {
    const labels = {
      publishedAt: 'Date',
      title: 'Title',
      readingTime: 'Reading Time'
    }
    return `${labels[sortBy]} (${sortOrder === 'asc' ? '↑' : '↓'})`
  }

  return (
    <div className="flex flex-wrap gap-4">
      {/* Category Filter */}
      <div className="relative">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
            selectedCategory
              ? 'bg-primary-100 border-primary-300 text-primary-700'
              : 'bg-white/80 border-secondary-300 text-secondary-600 hover:bg-secondary-50'
          }`}
        >
          <span>Category</span>
          {selectedCategory && (
            <span className="bg-primary-600 text-white px-2 py-0.5 rounded text-xs">
              {categories.find(cat => cat.slug === selectedCategory)?.name}
            </span>
          )}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {showCategories && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-secondary-200 z-10"
            >
              <div className="p-4 space-y-2">
                <button
                  onClick={() => {
                    onCategoryChange('')
                    setShowCategories(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-secondary-50 transition-colors duration-200 ${
                    !selectedCategory ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.slug)
                      setShowCategories(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-secondary-50 transition-colors duration-200 flex items-center gap-3 ${
                      selectedCategory === category.slug ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs ${category.color}`}>
                      {category.icon}
                    </span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-secondary-500">{category.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tags Filter */}
      <div className="relative">
        <button
          onClick={() => setShowTags(!showTags)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
            selectedTags.length > 0
              ? 'bg-purple-100 border-purple-300 text-purple-700'
              : 'bg-white/80 border-secondary-300 text-secondary-600 hover:bg-secondary-50'
          }`}
        >
          <span>Tags</span>
          {selectedTags.length > 0 && (
            <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs">
              {selectedTags.length}
            </span>
          )}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showTags ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {showTags && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-secondary-200 z-10"
            >
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-secondary-900">Select Tags</span>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => onTagsChange([])}
                      className="text-xs text-secondary-500 hover:text-secondary-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {tags.map((tag) => (
                    <label
                      key={tag.id}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-secondary-50 transition-colors duration-200 ${
                        selectedTags.includes(tag.slug) ? 'bg-purple-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.slug)}
                        onChange={() => handleTagToggle(tag.slug)}
                        className="rounded border-secondary-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-secondary-700 flex-1">{tag.name}</span>
                      <span className="text-xs text-secondary-400">({tag.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort Filter */}
      <div className="relative">
        <button
          onClick={() => setShowSort(!showSort)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white/80 border-secondary-300 text-secondary-600 hover:bg-secondary-50 transition-colors duration-200"
        >
          <span>Sort by</span>
          <span className="bg-secondary-600 text-white px-2 py-0.5 rounded text-xs">
            {getSortLabel()}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showSort ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {showSort && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 z-10"
            >
              <div className="p-2 space-y-1">
                {[
                  { key: 'publishedAt' as const, label: 'Date' },
                  { key: 'title' as const, label: 'Title' },
                  { key: 'readingTime' as const, label: 'Reading Time' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => {
                      handleSortChange(key)
                      setShowSort(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-secondary-50 transition-colors duration-200 flex items-center justify-between ${
                      sortBy === key ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
                    }`}
                  >
                    <span>{label}</span>
                    {sortBy === key && (
                      <span className="text-xs">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BlogFilters