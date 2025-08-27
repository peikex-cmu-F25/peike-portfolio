import React from 'react'
import { motion } from 'framer-motion'

interface SkillTagProps {
  skill: string
  variant?: 'default' | 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  interactive?: boolean
  onClick?: () => void
}

const SkillTag: React.FC<SkillTagProps> = ({
  skill,
  variant = 'default',
  size = 'md',
  color = 'primary',
  interactive = false,
  onClick
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const getVariantClasses = () => {
    const baseClasses = 'rounded-full font-medium transition-all duration-200'
    
    const colorMap = {
      primary: {
        default: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
        outlined: 'border border-primary-300 text-primary-700 hover:bg-primary-50',
        filled: 'bg-primary-600 text-white hover:bg-primary-700'
      },
      secondary: {
        default: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200',
        outlined: 'border border-secondary-300 text-secondary-700 hover:bg-secondary-50',
        filled: 'bg-secondary-600 text-white hover:bg-secondary-700'
      },
      success: {
        default: 'bg-green-100 text-green-700 hover:bg-green-200',
        outlined: 'border border-green-300 text-green-700 hover:bg-green-50',
        filled: 'bg-green-600 text-white hover:bg-green-700'
      },
      warning: {
        default: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
        outlined: 'border border-yellow-300 text-yellow-700 hover:bg-yellow-50',
        filled: 'bg-yellow-600 text-white hover:bg-yellow-700'
      },
      error: {
        default: 'bg-red-100 text-red-700 hover:bg-red-200',
        outlined: 'border border-red-300 text-red-700 hover:bg-red-50',
        filled: 'bg-red-600 text-white hover:bg-red-700'
      }
    }

    return `${baseClasses} ${colorMap[color][variant]} ${sizeClasses[size]}`
  }

  const Component = interactive ? motion.button : motion.span

  return (
    <Component
      className={`
        ${getVariantClasses()}
        ${interactive ? 'cursor-pointer' : 'cursor-default'}
      `}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {skill}
    </Component>
  )
}

export default SkillTag