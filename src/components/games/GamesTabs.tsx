import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Zap, Target, Brain } from 'lucide-react'
import AsteroidAvoider from './AsteroidAvoider'
import SnakeGame from './SnakeGame'
import GomokuGame from './GomokuGame'

interface GameTabsProps {
  className?: string
}

interface Game {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  component: React.ComponentType
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tech: string[]
}

const games: Game[] = [
  {
    id: 'asteroid-avoider',
    name: 'Asteroid Avoider',
    description: 'Classic space shooter with smooth physics and particle effects',
    icon: <Zap className="w-5 h-5" />,
    component: AsteroidAvoider,
    category: 'Action',
    difficulty: 'Medium',
    tech: ['Canvas', 'Physics', 'Animations']
  },
  {
    id: 'snake-game',
    name: 'Snake Game',
    description: 'Modern take on the classic Snake with responsive controls',
    icon: <Target className="w-5 h-5" />,
    component: SnakeGame,
    category: 'Arcade',
    difficulty: 'Easy',
    tech: ['Grid Logic', 'State Management', 'Touch Controls']
  },
  {
    id: 'gomoku-ai',
    name: 'Gomoku AI',
    description: 'Five-in-a-row with advanced MCTS AI opponent',
    icon: <Brain className="w-5 h-5" />,
    component: GomokuGame,
    category: 'Strategy',
    difficulty: 'Hard',
    tech: ['MCTS', 'Q-Learning', 'Game Theory']
  }
]

const GamesTabs: React.FC<GameTabsProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<string>(games[0].id)
  const activeGame = games.find(game => game.id === activeTab)

  const tabVariants = {
    inactive: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'rgb(100, 116, 139)',
      scale: 1
    },
    active: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      color: 'rgb(59, 130, 246)',
      scale: 1.02
    }
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Games Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Gamepad2 className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Interactive Games
          </h2>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Showcasing technical skills through engaging game development. Each game demonstrates 
          different programming concepts from physics simulations to advanced AI algorithms.
        </p>
      </div>

      {/* Game Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {games.map((game) => (
            <motion.button
              key={game.id}
              onClick={() => setActiveTab(game.id)}
              variants={tabVariants}
              animate={activeTab === game.id ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 min-w-fit"
            >
              <span className="flex-shrink-0">{game.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{game.name}</div>
                <div className="text-xs opacity-75">{game.category} • {game.difficulty}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Game Info Bar */}
      {activeGame && (
        <motion.div
          key={`info-${activeTab}`}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 p-4 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-800 mb-1">{activeGame.name}</h3>
              <p className="text-slate-600 text-sm">{activeGame.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase tracking-wide">Technologies</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeGame.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase tracking-wide">Difficulty</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                  activeGame.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  activeGame.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {activeGame.difficulty}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Game Container */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
        <AnimatePresence mode="wait">
          {activeGame && (
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full"
            >
              <activeGame.component />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Technical Notes */}
      <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <h4 className="font-semibold text-slate-800 mb-2">Technical Implementation</h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          These games are built with React, TypeScript, and HTML5 Canvas, demonstrating various 
          programming concepts including game loops, collision detection, AI algorithms, and 
          responsive design. Each game showcases different technical skills relevant to modern 
          software development.
        </p>
      </div>
    </div>
  )
}

export default GamesTabs