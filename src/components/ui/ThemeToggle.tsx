import { memo } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { trackEvent } from '../../utils/analytics'

interface ThemeToggleProps {
  className?: string
  variant?: 'icon' | 'pill'
}

const ThemeToggleComponent = ({ className = '', variant = 'icon' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    trackEvent('theme_toggle', { nextTheme })
    toggleTheme()
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:text-gray-200 dark:hover:border-neutral-500 dark:hover:text-primary-200 ${className}`}
      >
        {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-primary-600 transition-colors duration-200 hover:border-primary-200 hover:bg-primary-50 dark:text-primary-200 dark:hover:bg-neutral-800 dark:hover:border-neutral-600 ${className}`}
    >
      {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  )
}

export const ThemeToggle = memo(ThemeToggleComponent)

export default ThemeToggle
