import React from 'react'
import { Link } from 'react-router-dom'
import { personalInfo } from '../data/portfolio'
import { education } from '../data/experience'
import { skillsData } from '../data/skills'
import { trackResumeDownload } from '../utils/analytics'

const linkClass =
  'text-primary-700 underline decoration-primary-300 underline-offset-4 hover:decoration-primary-700 dark:text-primary-300 dark:decoration-primary-700 dark:hover:decoration-primary-300'

const About: React.FC = () => {
  return (
    <div className="section-padding py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[1fr_15rem] md:gap-14">
          <div className="max-w-[62ch]">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">About</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-gray-300">{personalInfo.bio}</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
              Outside of work I take photos and build small browser games, a couple of them from my AI coursework. A
              few of each are on this site: see the <Link to="/gallery" className={linkClass}>photos</Link> and the{' '}
              <Link to="/games" className={linkClass}>games</Link>.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackResumeDownload()}
                className={linkClass}
              >
                Resume (PDF)
              </a>
              <span className="text-slate-400"> / </span>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
              <span className="text-slate-400"> / </span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </p>
          </div>
          <img
            src="/images/profile/peike-professional-photo.png"
            alt="Peike Xu in front of a Carnegie Mellon Tartans banner"
            className="w-64 md:w-full h-auto rounded-lg border border-slate-200 dark:border-neutral-700"
            loading="lazy"
          />
        </div>

        <section className="mt-20" aria-labelledby="skills">
          <h2 id="skills" className="text-lg font-semibold text-slate-900 dark:text-white">Skills</h2>
          <dl className="mt-2 divide-y divide-slate-200 border-y border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
            {skillsData.map(group => (
              <div key={group.category} className="grid gap-1 py-4 md:grid-cols-[9.5rem_1fr] md:gap-8">
                <dt className="font-medium text-slate-900 dark:text-white">{group.category}</dt>
                <dd className="leading-relaxed text-slate-700 dark:text-gray-300">{group.skills.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16" aria-labelledby="education">
          <h2 id="education" className="text-lg font-semibold text-slate-900 dark:text-white">Education</h2>
          <ul className="mt-2 divide-y divide-slate-200 border-y border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
            {education.map(edu => (
              <li key={edu.id} className="grid gap-1 py-6 md:grid-cols-[9.5rem_1fr] md:gap-8">
                <p className="text-sm text-slate-500 dark:text-gray-400 md:pt-0.5 tabular-nums">{edu.duration}</p>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {edu.degree}
                    <span className="font-normal text-slate-600 dark:text-gray-400">, {edu.institution}</span>
                  </h3>
                  {edu.gpa && <p className="text-sm text-slate-500 dark:text-gray-400">GPA {edu.gpa}</p>}
                  <ul className="mt-2 space-y-1 leading-relaxed text-slate-700 dark:text-gray-300">
                    {edu.highlights.map(h => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About
