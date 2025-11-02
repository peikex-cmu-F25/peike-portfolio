import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'peike-portfolio-theme'

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const applyThemeToDom = (theme: Theme) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => getPreferredTheme())

  useEffect(() => {
    applyThemeToDom(theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore storage errors
    }
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return

    const listener = (event: MediaQueryListEvent) => {
      setThemeState(prev => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
        if (stored === 'light' || stored === 'dark') {
          return stored
        }
        return event.matches ? 'dark' : 'light'
      })
    }

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme
    }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const initializeTheme = () => {
  const theme = getPreferredTheme()
  applyThemeToDom(theme)
}
