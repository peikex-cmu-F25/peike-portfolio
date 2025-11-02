import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
