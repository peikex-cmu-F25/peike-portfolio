import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Trophy, Target, Zap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

// Game configuration constants
const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  GRID_SIZE: 20,
  INITIAL_SPEED: 150, // milliseconds between moves
  SPEED_INCREMENT: 5, // speed increase per food eaten
  MIN_SPEED: 80, // minimum time between moves
  COLORS: {
    BACKGROUND: '#0f172a',
    GRID: '#1e293b',
    SNAKE_HEAD: '#10b981',
    SNAKE_BODY: '#34d399',
    SNAKE_TAIL: '#6ee7b7',
    FOOD: '#ef4444',
    FOOD_GLOW: '#fca5a5',
    UI_PRIMARY: '#3b82f6',
    UI_SECONDARY: '#64748b',
    TEXT: '#f8fafc'
  }
} as const

// Calculate grid dimensions
const GRID_WIDTH = Math.floor(GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE)
const GRID_HEIGHT = Math.floor(GAME_CONFIG.CANVAS_HEIGHT / GAME_CONFIG.GRID_SIZE)

// Type definitions
interface Position {
  x: number
  y: number
}

interface SnakeSegment extends Position {
  age: number
}

interface GameState {
  isPlaying: boolean
  isPaused: boolean
  gameOver: boolean
  score: number
  highScore: number
  speed: number
  snake: SnakeSegment[]
  food: Position
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  nextDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
}

interface TouchStart {
  x: number
  y: number
  time: number
}

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)
  const touchStartRef = useRef<TouchStart | null>(null)
  
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Initialize game state
  const [gameState, setGameState] = useState<GameState>(() => ({
    isPlaying: false,
    isPaused: false,
    gameOver: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('snake-high-score') || '0'),
    speed: GAME_CONFIG.INITIAL_SPEED,
    snake: [{ x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2), age: 0 }],
    food: { x: 5, y: 5 },
    direction: 'RIGHT',
    nextDirection: 'RIGHT'
  }))

  // Generate random food position
  const generateFood = useCallback((snake: SnakeSegment[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  // Reset game
  const resetGame = useCallback(() => {
    const initialSnake = [{ x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2), age: 0 }]
    setGameState(prevState => ({
      ...prevState,
      isPlaying: false,
      isPaused: false,
      gameOver: false,
      score: 0,
      speed: GAME_CONFIG.INITIAL_SPEED,
      snake: initialSnake,
      food: generateFood(initialSnake),
      direction: 'RIGHT',
      nextDirection: 'RIGHT'
    }))
  }, [generateFood])

  // Handle direction change
  const changeDirection = useCallback((newDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    setGameState(prevState => {
      const { direction } = prevState
      
      // Prevent reversing into self
      if (
        (newDirection === 'UP' && direction === 'DOWN') ||
        (newDirection === 'DOWN' && direction === 'UP') ||
        (newDirection === 'LEFT' && direction === 'RIGHT') ||
        (newDirection === 'RIGHT' && direction === 'LEFT')
      ) {
        return prevState
      }

      return {
        ...prevState,
        nextDirection: newDirection
      }
    })
  }, [])

  // Game update logic
  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.isPaused || prevState.gameOver) {
        return prevState
      }

      const { snake, food, nextDirection, score } = prevState
      const head = snake[0]
      
      // Update direction
      const newDirection = nextDirection

      // Calculate new head position
      let newHead: SnakeSegment
      switch (newDirection) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1, age: 0 }
          break
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1, age: 0 }
          break
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y, age: 0 }
          break
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y, age: 0 }
          break
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_WIDTH || newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
        const newHighScore = Math.max(score, prevState.highScore)
        localStorage.setItem('snake-high-score', newHighScore.toString())
        
        return {
          ...prevState,
          gameOver: true,
          isPlaying: false,
          highScore: newHighScore
        }
      }

      // Check self collision
      if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        const newHighScore = Math.max(score, prevState.highScore)
        localStorage.setItem('snake-high-score', newHighScore.toString())
        
        return {
          ...prevState,
          gameOver: true,
          isPlaying: false,
          highScore: newHighScore
        }
      }

      // Create new snake
      const newSnake = [newHead, ...snake.map(segment => ({ ...segment, age: segment.age + 1 }))]
      let newFood = food
      let newScore = score
      let newSpeed = prevState.speed

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        newFood = generateFood(newSnake)
        newScore = score + 10
        newSpeed = Math.max(GAME_CONFIG.MIN_SPEED, prevState.speed - GAME_CONFIG.SPEED_INCREMENT)
        
        // Play eat sound
        if (soundEnabled) {
          // Create a simple beep sound
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.value = 400
          oscillator.type = 'square'
          
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
          
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.1)
        }
      } else {
        newSnake.pop() // Remove tail if no food eaten
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        speed: newSpeed,
        direction: newDirection
      }
    })
  }, [generateFood, soundEnabled])

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    if (timestamp - lastUpdateRef.current >= gameState.speed) {
      updateGame()
      lastUpdateRef.current = timestamp
    }
    
    if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }
  }, [gameState.speed, gameState.isPlaying, gameState.isPaused, gameState.gameOver, updateGame])

  // Start game loop when playing
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
      lastUpdateRef.current = performance.now()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver, gameLoop])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameState.isPlaying || gameState.isPaused) return

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault()
          changeDirection('UP')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault()
          changeDirection('DOWN')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault()
          changeDirection('LEFT')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault()
          changeDirection('RIGHT')
          break
        case ' ':
          event.preventDefault()
          togglePause()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState.isPlaying, gameState.isPaused, changeDirection])

  // Touch controls
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
  }, [])

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    if (!touchStartRef.current || !gameState.isPlaying || gameState.isPaused) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const deltaTime = Date.now() - touchStartRef.current.time

    // Minimum swipe distance and maximum time
    const minDistance = 50
    const maxTime = 500

    if (Math.abs(deltaX) < minDistance && Math.abs(deltaY) < minDistance) return
    if (deltaTime > maxTime) return

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        changeDirection('RIGHT')
      } else {
        changeDirection('LEFT')
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        changeDirection('DOWN')
      } else {
        changeDirection('UP')
      }
    }

    touchStartRef.current = null
  }, [gameState.isPlaying, gameState.isPaused, changeDirection])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Toggle pause
  const togglePause = useCallback(() => {
    if (!gameState.isPlaying) return
    
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }))
  }, [gameState.isPlaying])

  // Start game
  const startGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPlaying: true,
      isPaused: false,
      gameOver: false
    }))
  }, [])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = GAME_CONFIG.COLORS.GRID
    ctx.lineWidth = 1
    for (let x = 0; x <= GRID_WIDTH; x++) {
      ctx.beginPath()
      ctx.moveTo(x * GAME_CONFIG.GRID_SIZE, 0)
      ctx.lineTo(x * GAME_CONFIG.GRID_SIZE, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y <= GRID_HEIGHT; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * GAME_CONFIG.GRID_SIZE)
      ctx.lineTo(canvas.width, y * GAME_CONFIG.GRID_SIZE)
      ctx.stroke()
    }

    // Draw food with glow effect
    const foodX = gameState.food.x * GAME_CONFIG.GRID_SIZE
    const foodY = gameState.food.y * GAME_CONFIG.GRID_SIZE
    
    // Food glow
    ctx.shadowColor = GAME_CONFIG.COLORS.FOOD_GLOW
    ctx.shadowBlur = 15
    ctx.fillStyle = GAME_CONFIG.COLORS.FOOD
    ctx.fillRect(
      foodX + 2,
      foodY + 2,
      GAME_CONFIG.GRID_SIZE - 4,
      GAME_CONFIG.GRID_SIZE - 4
    )
    ctx.shadowBlur = 0

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * GAME_CONFIG.GRID_SIZE
      const y = segment.y * GAME_CONFIG.GRID_SIZE
      
      if (index === 0) {
        // Snake head
        ctx.fillStyle = GAME_CONFIG.COLORS.SNAKE_HEAD
        ctx.shadowColor = GAME_CONFIG.COLORS.SNAKE_HEAD
        ctx.shadowBlur = 8
      } else {
        // Snake body - gradient based on age
        const alpha = Math.max(0.6, 1 - segment.age * 0.1)
        ctx.fillStyle = index < 3 ? GAME_CONFIG.COLORS.SNAKE_BODY : GAME_CONFIG.COLORS.SNAKE_TAIL
        ctx.globalAlpha = alpha
        ctx.shadowBlur = 0
      }
      
      ctx.fillRect(
        x + 1,
        y + 1,
        GAME_CONFIG.GRID_SIZE - 2,
        GAME_CONFIG.GRID_SIZE - 2
      )
      
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    })
  }, [gameState.snake, gameState.food])

  return (
    <div className="section-padding py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Snake</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
            The classic game, with keyboard and swipe controls. Back to the{' '}
            <Link
              to="/games"
              className="text-primary-700 underline decoration-primary-300 underline-offset-4 hover:decoration-primary-700 dark:text-primary-300 dark:decoration-primary-700"
            >
              other games
            </Link>
            .
          </p>
        </header>

      <div className="card mt-10 inline-block max-w-full">

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-4 text-slate-700 dark:text-gray-300">
          <span>
            Score <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{gameState.score}</span>
          </span>
          <span>
            Best <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{gameState.highScore}</span>
          </span>
        </div>

        {/* Game Canvas */}
        <div className="relative mb-6">
          <canvas
            ref={canvasRef}
            width={GAME_CONFIG.CANVAS_WIDTH}
            height={GAME_CONFIG.CANVAS_HEIGHT}
            className="rounded-md bg-slate-900 max-w-full h-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'none' }}
          />
          
          {/* Game Over Overlay */}
          <AnimatePresence>
            {gameState.gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/75 flex items-center justify-center rounded-md"
              >
                <div className="text-center text-white">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-semibold mb-2">Game over</h2>
                    <p className="text-xl mb-4">Score: {gameState.score}</p>
                    {gameState.score === gameState.highScore && gameState.score > 0 && (
                      <p className="mb-4">New best score</p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pause Overlay */}
          <AnimatePresence>
            {gameState.isPaused && gameState.isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md"
              >
                <div className="text-center text-white">
                  <Pause size={48} className="mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold">Paused</h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <motion.button
            onClick={gameState.isPlaying ? togglePause : startGame}
            className="btn-primary gap-2"
          >
            {gameState.isPlaying ? (
              gameState.isPaused ? (
                <>
                  <Play size={20} />
                  Resume
                </>
              ) : (
                <>
                  <Pause size={20} />
                  Pause
                </>
              )
            ) : (
              <>
                <Play size={20} />
                {gameState.gameOver ? 'Play again' : 'Start'}
              </>
            )}
          </motion.button>

          <motion.button
            onClick={resetGame}
            className="btn-secondary gap-2"
          >
            <RotateCcw size={20} />
            Reset
          </motion.button>

          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn-secondary gap-2"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            {soundEnabled ? 'Sound on' : 'Sound off'}
          </motion.button>
        </div>

        {/* Mobile Touch Controls */}
        {isMobile && (
          <div className="mb-4">
            <p className="text-slate-600 dark:text-gray-400 mb-3">Touch controls</p>
            <div className="grid grid-cols-3 gap-2 max-w-48">
              <div></div>
              <motion.button
                onClick={() => changeDirection('UP')}
                className="p-3 border border-slate-300 text-slate-700 hover:border-slate-500 rounded-md flex items-center justify-center dark:border-neutral-700 dark:text-gray-200"
              >
                <ArrowUp size={20} />
              </motion.button>
              <div></div>
              
              <motion.button
                onClick={() => changeDirection('LEFT')}
                className="p-3 border border-slate-300 text-slate-700 hover:border-slate-500 rounded-md flex items-center justify-center dark:border-neutral-700 dark:text-gray-200"
              >
                <ArrowLeft size={20} />
              </motion.button>
              <div></div>
              <motion.button
                onClick={() => changeDirection('RIGHT')}
                className="p-3 border border-slate-300 text-slate-700 hover:border-slate-500 rounded-md flex items-center justify-center dark:border-neutral-700 dark:text-gray-200"
              >
                <ArrowRight size={20} />
              </motion.button>
              
              <div></div>
              <motion.button
                onClick={() => changeDirection('DOWN')}
                className="p-3 border border-slate-300 text-slate-700 hover:border-slate-500 rounded-md flex items-center justify-center dark:border-neutral-700 dark:text-gray-200"
              >
                <ArrowDown size={20} />
              </motion.button>
              <div></div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-sm text-slate-500 dark:text-gray-400">
          <p className="mb-1">
            {isMobile ? 'Swipe or use touch controls to move' : 'Use arrow keys or WASD to move'}
          </p>
          <p className="mb-1">Collect food to grow and increase your score</p>
          <p>Press Space to pause. Avoid the walls and your own tail.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SnakeGame