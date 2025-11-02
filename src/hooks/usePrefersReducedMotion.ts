import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return false
    }
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return
    }

    const mediaQueryList = window.matchMedia(QUERY)
    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)

    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [])

  return prefersReducedMotion
}
