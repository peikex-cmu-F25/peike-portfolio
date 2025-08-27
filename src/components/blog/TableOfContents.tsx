import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TableOfContentsItem } from '../../types/blog'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map(item => document.getElementById(item.id)).filter(Boolean)
      
      if (headings.length === 0) return

      const scrollPosition = window.scrollY + 100 // Offset for header

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const renderItems = (tocItems: TableOfContentsItem[]) => {
    return tocItems.map((item) => (
      <li key={item.id}>
        <button
          onClick={() => scrollToHeading(item.id)}
          className={`block w-full text-left py-2 px-3 text-sm rounded transition-colors duration-200 ${
            activeId === item.id
              ? 'bg-primary-100 text-primary-700 font-medium border-l-2 border-primary-600'
              : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
          } ${item.level === 3 ? 'pl-6' : item.level === 4 ? 'pl-9' : ''}`}
        >
          {item.title}
        </button>
        {item.children && item.children.length > 0 && (
          <ul className="ml-2 mt-1">
            {renderItems(item.children)}
          </ul>
        )}
      </li>
    ))
  }

  if (items.length === 0) return null

  return (
    <nav className="card" aria-label="Table of contents">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-secondary-900">Table of Contents</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-secondary-500 hover:text-secondary-700 lg:hidden"
          aria-expanded={isOpen}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <AnimatePresence>
        {(isOpen) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-1 max-h-96 overflow-y-auto">
              {renderItems(items)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default TableOfContents