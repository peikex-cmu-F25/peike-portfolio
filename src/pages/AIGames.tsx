import { useState } from 'react'
import { Link } from 'react-router-dom'
import AI2048Game from '../components/games/AI2048Game'
import GomokuAIGame from '../components/games/GomokuAIGame'

type GameTab = '2048' | 'gomoku'

const tabs: Array<{ id: GameTab; label: string; description: string }> = [
  {
    id: '2048',
    label: '2048',
    description: 'Expectimax search agent from CSE 150B.'
  },
  {
    id: 'gomoku',
    label: 'Gomoku',
    description: 'A heuristic opponent from the same course.'
  }
]

const AIGames = () => {
  const [activeTab, setActiveTab] = useState<GameTab>('2048')

  return (
    <div className="section-padding py-16 md:py-24">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Games</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
            Two game-playing agents from my AI coursework at UC San Diego (CSE 150B), rebuilt in TypeScript so they run
            in the browser. Play against them, or let them play and watch which move they pick. There is also a plain{' '}
            <Link
              to="/games/snake"
              className="text-primary-700 underline decoration-primary-300 underline-offset-4 hover:decoration-primary-700 dark:text-primary-300 dark:decoration-primary-700"
            >
              Snake
            </Link>{' '}
            game.
          </p>
        </header>

        <nav className="flex flex-wrap gap-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg border px-4 py-3 text-left transition-colors sm:min-w-[220px] ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
                  : 'border-slate-200 text-slate-600 hover:border-slate-400 dark:border-neutral-700 dark:text-gray-400 dark:hover:border-neutral-500'
              }`}
            >
              <div className="text-sm font-semibold">{tab.label}</div>
              <div className="mt-1 text-xs text-secondary-500 dark:text-gray-400">{tab.description}</div>
            </button>
          ))}
        </nav>

        <div className="space-y-8">
        {activeTab === '2048' ? <AI2048Game /> : <GomokuAIGame />}
        </div>
      </div>
    </div>
  )
}

export default AIGames
