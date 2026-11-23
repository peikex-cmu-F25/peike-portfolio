import React from 'react'
import { personalInfo } from '../data/portfolio'

const Footer: React.FC = () => {
  const linkClass = 'hover:text-slate-900 dark:hover:text-white underline-offset-4 hover:underline'

  return (
    <footer className="border-t border-slate-200 dark:border-neutral-800">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto flex flex-col gap-3 py-8 text-sm text-slate-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {personalInfo.name}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <a href={`mailto:${personalInfo.email}`} className={linkClass}>
                {personalInfo.email}
              </a>
            </li>
            <li>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </li>
            <li>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
