import { MutableRefObject, useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  once?: boolean
}

export const useIntersectionObserver = <T extends Element>(
  options: UseIntersectionObserverOptions = {}
): { ref: MutableRefObject<T | null>; isIntersecting: boolean } => {
  const { once = true, ...observerOptions } = options
  const elementRef = useRef<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) {
      return
    }

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          if (once) {
            observerInstance.unobserve(entry.target)
          }
        } else if (!once) {
          setIsIntersecting(false)
        }
      })
    }, observerOptions)

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [once, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold])

  return { ref: elementRef, isIntersecting }
}
