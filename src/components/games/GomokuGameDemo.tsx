import React from 'react'
import { motion } from 'framer-motion'
import GomokuGame from './GomokuGame'

/**
 * Demo wrapper for the Gomoku game component.
 * This demonstrates how to integrate the game into your portfolio.
 */
const GomokuGameDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Demo Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Gomoku with AI
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            A professional implementation of Gomoku (Five in a Row) featuring an advanced AI opponent 
            powered by Monte Carlo Tree Search (MCTS) algorithm with Q-Learning integration.
          </p>
        </motion.div>

        {/* Technical Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur rounded-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Technical Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-300">
            <div className="space-y-2">
              <h3 className="font-medium text-blue-400">AI Algorithm</h3>
              <ul className="text-sm space-y-1">
                <li>• Monte Carlo Tree Search (MCTS)</li>
                <li>• Q-Learning integration</li>
                <li>• UCB1 node selection</li>
                <li>• Position evaluation heuristics</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-green-400">Game Features</h3>
              <ul className="text-sm space-y-1">
                <li>• 15x15 standard Gomoku board</li>
                <li>• Win detection (5 in a row)</li>
                <li>• Move history & undo</li>
                <li>• Configurable AI difficulty</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-purple-400">UI/UX</h3>
              <ul className="text-sm space-y-1">
                <li>• Responsive design</li>
                <li>• Touch & mouse controls</li>
                <li>• Smooth animations</li>
                <li>• Real-time AI progress</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Game Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/30 backdrop-blur rounded-xl p-4"
        >
          <GomokuGame />
        </motion.div>

        {/* Algorithm Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur rounded-xl p-6 mt-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Algorithm Overview</h2>
          <div className="text-slate-300 space-y-4">
            <div>
              <h3 className="font-medium text-blue-400 mb-2">Monte Carlo Tree Search (MCTS)</h3>
              <p className="text-sm">
                The AI uses MCTS to explore possible game states by building a search tree through 
                four phases: Selection (UCB1), Expansion, Simulation, and Backpropagation. This 
                approach balances exploration of new moves with exploitation of promising positions.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-green-400 mb-2">Q-Learning Integration</h3>
              <p className="text-sm">
                Q-values are maintained for each node to learn from experience, with updates using 
                a learning rate and discount factor. This helps the AI improve its position evaluation 
                over time and make more informed decisions.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-purple-400 mb-2">Position Evaluation</h3>
              <p className="text-sm">
                The evaluation function considers line formations, threat detection, and strategic 
                positioning. It scores positions based on immediate threats, potential formations, 
                and long-term strategic value.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GomokuGameDemo