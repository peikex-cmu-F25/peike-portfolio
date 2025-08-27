import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ReadingProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const threshold = 100
      setIsVisible(scrolled > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary-600 origin-left z-50"
      style={{ 
        scaleX,
        opacity: isVisible ? 1 : 0
      }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}

export default ReadingProgress