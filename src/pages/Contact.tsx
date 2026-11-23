import React from 'react'
import { personalInfo } from '../data/portfolio'
import { trackEvent, trackResumeDownload } from '../utils/analytics'

const linkClass =
  'text-primary-700 underline decoration-primary-300 underline-offset-4 hover:decoration-primary-700 dark:text-primary-300 dark:decoration-primary-700 dark:hover:decoration-primary-300'

const Contact: React.FC = () => {
  const rows: Array<{ label: string; value: string; href: string; external?: boolean; onClick?: () => void }> = [
    {
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      onClick: () => trackEvent('contact_email_click')
    },
    {
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:+1${personalInfo.phone.replace(/[^\d]/g, '')}`
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/p3xu',
      href: personalInfo.linkedin,
      external: true
    },
    {
      label: 'GitHub',
      value: personalInfo.github.replace('https://', ''),
      href: personalInfo.github,
      external: true
    },
    {
      label: 'Resume',
      value: 'PDF, one page',
      href: personalInfo.resumeUrl,
      external: true,
      onClick: () => trackResumeDownload()
    }
  ]

  return (
    <div className="section-padding py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Contact</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-gray-300 max-w-[60ch]">
          Email is the fastest way to reach me. I'm graduating from Carnegie Mellon in December 2026 and looking for
          full-time software engineering roles in backend, infrastructure, or AI applications, starting in 2027.
        </p>

        <dl className="mt-10 divide-y divide-slate-200 border-y border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
          {rows.map(row => (
            <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
              <dt className="text-slate-500 dark:text-gray-400">{row.label}</dt>
              <dd>
                <a
                  href={row.href}
                  onClick={row.onClick}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={linkClass}
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
          <div className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
            <dt className="text-slate-500 dark:text-gray-400">Location</dt>
            <dd className="text-slate-700 dark:text-gray-300">{personalInfo.location}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default Contact
