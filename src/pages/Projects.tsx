import React from 'react'
import { workExperience } from '../data/experience'
import { projects, personalInfo } from '../data/portfolio'
import type { ExperienceData } from '../data/types'

const linkClass =
  'text-primary-700 underline decoration-primary-300 underline-offset-4 hover:decoration-primary-700 dark:text-primary-300 dark:decoration-primary-700 dark:hover:decoration-primary-300'

// Teaching and editorial roles are listed compactly below the main roles.
const SECONDARY_ROLES = new Set(['cmu-teaching-assistant', 'ieee-editor', 'ucsd-cse-tutor', 'ucsd-math-tutor'])

const Entry: React.FC<{ when: string; children: React.ReactNode }> = ({ when, children }) => (
  <li className="grid gap-1 py-7 md:grid-cols-[9.5rem_1fr] md:gap-8">
    <p className="text-sm text-slate-500 dark:text-gray-400 md:pt-0.5 tabular-nums">{when}</p>
    <div>{children}</div>
  </li>
)

const Role: React.FC<{ work: ExperienceData }> = ({ work }) => (
  <Entry when={work.duration}>
    <h3 className="font-semibold text-slate-900 dark:text-white">
      {work.role}
      <span className="font-normal text-slate-600 dark:text-gray-400">, {work.company}</span>
    </h3>
    <p className="text-sm text-slate-500 dark:text-gray-400">{work.location}</p>
    <p className="mt-3 leading-relaxed text-slate-700 dark:text-gray-300">{work.description}</p>
    <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-slate-400 leading-relaxed text-slate-700 dark:text-gray-300">
      {work.achievements.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <p className="mt-3 text-sm text-slate-500 dark:text-gray-400">{work.technologies.join(', ')}</p>
  </Entry>
)

const Projects: React.FC = () => {
  const mainRoles = workExperience.filter(w => !SECONDARY_ROLES.has(w.id))
  const otherRoles = workExperience.filter(w => SECONDARY_ROLES.has(w.id))

  return (
    <div className="section-padding py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Experience
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
            Research, a startup I co-founded, internships, and projects. The same material, in one page, is in my{' '}
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              resume
            </a>
            .
          </p>
        </header>

        <section className="mt-14" aria-labelledby="work">
          <h2 id="work" className="text-lg font-semibold text-slate-900 dark:text-white">
            Work and research
          </h2>
          <ul className="mt-2 divide-y divide-slate-200 border-t border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
            {mainRoles.map(work => (
              <Role key={work.id} work={work} />
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="projects">
          <h2 id="projects" className="text-lg font-semibold text-slate-900 dark:text-white">
            Projects
          </h2>
          <ul className="mt-2 divide-y divide-slate-200 border-t border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
            {projects.map(project => (
              <Entry key={project.id} when={String(project.year)}>
                <h3 className="font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-700 dark:text-gray-300">{project.longDescription}</p>
                {project.features.length > 0 && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-slate-400 leading-relaxed text-slate-700 dark:text-gray-300">
                    {project.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 text-sm text-slate-500 dark:text-gray-400">{project.technologies.join(', ')}</p>
              </Entry>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="teaching">
          <h2 id="teaching" className="text-lg font-semibold text-slate-900 dark:text-white">
            Teaching and editing
          </h2>
          <ul className="mt-2 divide-y divide-slate-200 border-y border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
            {otherRoles.map(work => (
              <Entry key={work.id} when={work.duration}>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {work.role}
                  <span className="font-normal text-slate-600 dark:text-gray-400">, {work.company}</span>
                </h3>
                <p className="mt-1 leading-relaxed text-slate-700 dark:text-gray-300">{work.description}</p>
              </Entry>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Projects
