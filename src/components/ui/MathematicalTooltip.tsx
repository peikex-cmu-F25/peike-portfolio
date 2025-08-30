import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MathematicalTooltipProps {
  symbol: string
  meaning: string
  connection?: string
  children: React.ReactNode
  className?: string
}

const MathematicalTooltip: React.FC<MathematicalTooltipProps> = ({
  symbol,
  meaning,
  connection,
  children,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white border border-accent-200 rounded-lg shadow-lg min-w-max max-w-xs"
          >
            <div className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mathematical text-accent-600 text-lg">{symbol}</span>
                <span className="font-semibold text-primary-800">{meaning}</span>
              </div>
              {connection && (
                <div className="text-primary-600 text-xs">
                  {connection}
                </div>
              )}
            </div>
            
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent-200 translate-y-px" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MathematicalTooltip