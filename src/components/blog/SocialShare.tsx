import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ShareUrls {
  twitter: string
  linkedin: string
  facebook: string
  email: string
  copy: string
}

interface SocialShareProps {
  shareUrls: ShareUrls
  title: string
  compact?: boolean
  vertical?: boolean
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  shareUrls, 
  title, 
  compact = false, 
  vertical = false 
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrls.copy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrls.copy
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const socialButtons = [
    {
      name: 'Twitter',
      url: shareUrls.twitter,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'hover:bg-blue-500 hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: shareUrls.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Facebook',
      url: shareUrls.facebook,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'hover:bg-blue-700 hover:text-white'
    },
    {
      name: 'Email',
      url: shareUrls.email,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'hover:bg-gray-600 hover:text-white'
    }
  ]

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-secondary-600">Share:</span>
        <div className="flex items-center gap-1">
          {socialButtons.map((button) => (
            <a
              key={button.name}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 text-secondary-500 ${button.color} transition-all duration-200 rounded-full`}
              title={`Share on ${button.name}`}
            >
              {button.icon}
            </a>
          ))}
          <button
            onClick={handleCopyLink}
            className={`p-2 text-secondary-500 hover:bg-green-500 hover:text-white transition-all duration-200 rounded-full ${
              copied ? 'bg-green-500 text-white' : ''
            }`}
            title="Copy link"
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    )
  }

  const containerClass = vertical 
    ? "flex flex-col gap-3" 
    : "flex items-center gap-4 flex-wrap"

  const buttonClass = vertical
    ? "flex items-center gap-3 p-3 text-secondary-600 bg-white border border-secondary-200 rounded-lg hover:shadow-md transition-all duration-200"
    : "flex items-center gap-2 px-4 py-2 text-secondary-600 bg-white border border-secondary-200 rounded-lg hover:shadow-md transition-all duration-200"

  return (
    <div className={containerClass}>
      {!vertical && <span className="font-medium text-secondary-700">Share this article:</span>}
      
      {socialButtons.map((button) => (
        <motion.a
          key={button.name}
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} ${button.color}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {button.icon}
          {vertical && <span>{button.name}</span>}
        </motion.a>
      ))}
      
      <motion.button
        onClick={handleCopyLink}
        className={`${buttonClass} ${
          copied 
            ? 'bg-green-500 text-white border-green-500' 
            : 'hover:bg-green-500 hover:text-white hover:border-green-500'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
        {vertical && (
          <span>{copied ? 'Link copied!' : 'Copy link'}</span>
        )}
      </motion.button>
    </div>
  )
}

export default SocialShare