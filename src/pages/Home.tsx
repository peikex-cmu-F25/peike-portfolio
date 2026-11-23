import React from 'react'
import { Link } from 'react-router-dom'
import { personalInfo } from '../data/portfolio'

const linkClass =
  'text-primary-700 underline decoration-primary-300 underline-offset-4 hover:decoration-primary-700 dark:text-primary-300 dark:decoration-primary-700 dark:hover:decoration-primary-300'

const selectedWork = [
  {
    title: 'Retrieval service for a business chatbot',
    context: 'iStream AI (co-founder), 2025',
    body: 'Serverless RAG backend on AWS Lambda and OpenSearch. Hybrid search — HNSW vectors plus BM25, merged with Reciprocal Rank Fusion — raised top-5 precision from 0.62 to 0.79 on a 200-query evaluation set, with p95 latency under 900 ms at 50 concurrent requests.'
  },
  {
    title: 'Smart Sentinel',
    context: 'Project, 2026',
    body: 'A Kafka pipeline that keeps slow LLM analysis off the real-time path: three consumer groups with separate offsets, 15 ms median from publish to WebSocket. Load testing traced the throughput limit to serial consumer processing rather than the HTTP client, as first assumed.'
  },
  {
    title: "Modeling Alzheimer's progression",
    context: 'Carnegie Mellon research, 2026–',
    body: 'A stage-conditioned transformer diffusion model that generates cell states across disease stages, trained on 240K single cells from 84 donors with donor-level splits so the evaluation does not leak.'
  }
]

const Home: React.FC = () => {
  return (
    <div className="section-padding py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <header>
          <div className="flex items-center gap-5">
            <img
              src="/images/profile/peike-portrait.png"
              alt="Peike Xu"
              width={88}
              height={88}
              className="h-20 w-20 md:h-[88px] md:w-[88px] rounded-full object-cover object-top border border-slate-200 dark:border-neutral-700"
            />
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{personalInfo.name}</h1>
              <p className="text-slate-600 dark:text-gray-400">Software engineer, {personalInfo.location}</p>
            </div>
          </div>

          <p className="mt-12 text-3xl md:text-[2.75rem] md:leading-[1.15] font-semibold tracking-tight text-slate-900 dark:text-white max-w-[22ch]">
            I build backend systems for AI products, and I measure them before I optimize them.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-slate-700 dark:text-gray-300 max-w-[60ch]">
            I'm finishing an M.S. in Software Engineering at Carnegie Mellon (December 2026). I'm looking for new-grad
            roles in backend, infrastructure, or AI application engineering, starting in 2027.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-base">
            <li>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Resume (PDF)
              </a>
            </li>
            <li>
              <a href={`mailto:${personalInfo.email}`} className={linkClass}>
                Email
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
          </ul>
        </header>

        <section className="mt-20" aria-labelledby="selected-work">
          <h2 id="selected-work" className="text-lg font-semibold text-slate-900 dark:text-white">
            Selected work
          </h2>
          <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
            {selectedWork.map(item => (
              <li key={item.title} className="py-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 shrink-0">{item.context}</p>
                </div>
                <p className="mt-2 leading-relaxed text-slate-700 dark:text-gray-300">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link to="/projects" className={linkClass}>
              All experience and projects
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}

export default Home
