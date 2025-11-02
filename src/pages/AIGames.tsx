import { useState } from 'react'
import { motion } from 'framer-motion'
import AI2048Game from '../components/games/AI2048Game'
import GomokuAIGame from '../components/games/GomokuAIGame'
import { ThemeToggle } from '../components/ui'

type GameTab = '2048' | 'gomoku'

const tabs: Array<{ id: GameTab; label: string; description: string }> = [
  {
    id: '2048',
    label: '2048 Expectimax',
    description: 'My search-based agent from CSE 150B, reimagined in the browser.'
  },
  {
    id: 'gomoku',
    label: 'Gomoku Heuristics',
    description: 'A heuristically guided opponent that mirrors my coursework approach.'
  }
]

const AIGames = () => {
  const [activeTab, setActiveTab] = useState<GameTab>('2048')

  return (
    <div className="min-h-screen section-padding py-16 bg-gradient-to-b from-secondary-50 to-white dark:from-neutral-950 dark:to-neutral-900 transition-colors">
      <div className="container-width space-y-12">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <motion.h1
              className="text-4xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Interactive AI Games
            </motion.h1>
            <motion.p
              className="mt-3 max-w-2xl text-lg text-secondary-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Coursework shouldn’t stay trapped in a repo. These mini-games surface the AI agents I built for CMU/UCSD
              assignments—rebuilt in TypeScript so you can poke, prod, and watch the heuristics make decisions live.
            </motion.p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="pill" />
          </div>
        </header>

        <nav className="flex flex-wrap gap-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition-all duration-200 sm:min-w-[240px] ${
                activeTab === tab.id
                  ? 'border-primary-400 bg-primary-50 text-primary-800 shadow-md dark:bg-primary-500/10 dark:border-primary-500 dark:text-primary-200'
                  : 'border-secondary-200 bg-white text-secondary-700 hover:border-primary-200 hover:text-primary-700 dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="text-sm font-semibold">{tab.label}</div>
              <div className="mt-1 text-xs text-secondary-500 dark:text-gray-400">{tab.description}</div>
            </button>
          ))}
        </nav>

        <main className="space-y-8">
        {activeTab === '2048' ? <AI2048Game /> : <GomokuAIGame />}
        </main>
      </div>
    </div>
  )
}

export default AIGames
