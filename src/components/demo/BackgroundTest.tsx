import React from 'react'
import MathematicalBackground from '../ui/MathematicalBackground'

/**
 * Test component to demonstrate different background intensities
 * This can be used during development to fine-tune readability
 */
const BackgroundTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Subtle (Default) */}
      <div className="relative h-screen/3 border-b border-gray-200 flex items-center justify-center">
        <MathematicalBackground variant="golden" intensity="subtle" />
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-display font-semibold text-primary-800 mb-4">
            Subtle Intensity
          </h2>
          <p className="text-primary-600 max-w-lg">
            This is the standard intensity level. The background should be visible but not interfere with text readability.
          </p>
        </div>
      </div>

      {/* Ultra-subtle */}
      <div className="relative h-screen/3 border-b border-gray-200 flex items-center justify-center">
        <MathematicalBackground variant="golden" intensity="ultra-subtle" />
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-display font-semibold text-primary-800 mb-4">
            Ultra-Subtle Intensity
          </h2>
          <p className="text-primary-600 max-w-lg">
            This is reduced intensity for sections where text is the primary focus. Perfect for content-heavy areas.
          </p>
        </div>
      </div>

      {/* Barely-visible */}
      <div className="relative h-screen/3 flex items-center justify-center">
        <MathematicalBackground variant="golden" intensity="barely-visible" />
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-display font-semibold text-primary-800 mb-4">
            Barely-Visible Intensity
          </h2>
          <p className="text-primary-600 max-w-lg">
            This is the most subtle level, providing just a hint of mathematical elegance without any visual interference.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BackgroundTest