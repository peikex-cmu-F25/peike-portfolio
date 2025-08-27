import React from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="text-secondary-500 hover:text-primary-600 transition-colors duration-200"
      >
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <svg 
            className="w-4 h-4 text-secondary-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          
          {item.current ? (
            <span 
              className="text-secondary-900 font-medium line-clamp-1" 
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.href} 
              className="text-secondary-500 hover:text-primary-600 transition-colors duration-200 line-clamp-1"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs