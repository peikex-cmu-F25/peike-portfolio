import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Trophy, Target, Zap } from 'lucide-react'

// Game configuration constants
const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  PLAYER_SIZE: 20,
  PLAYER_SPEED: 5,
  ASTEROID_MIN_SIZE: 15,
  ASTEROID_MAX_SIZE: 40,
  ASTEROID_SPEED_MIN: 1,
  ASTEROID_SPEED_MAX: 4,
  ASTEROID_SPAWN_RATE: 0.02,
  PARTICLE_COUNT: 8,
  PARTICLE_LIFE: 30
} as const

// Type definitions
interface Vector2D {
  x: number
  y: number
}

interface GameObject extends Vector2D {
  vx: number
  vy: number
  size: number
}

interface Player extends GameObject {
  trail: Vector2D[]
}

interface Asteroid extends GameObject {
  rotation: number
  rotationSpeed: number
}

interface Particle extends GameObject {
  life: number
  color: string
  alpha: number
}

interface GameState {
  isPlaying: boolean
  isPaused: boolean
  score: number
  highScore: number
  level: number
}

const AsteroidAvoider: React.FC = () => {
  // Canvas and game loop refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const gameStateRef = useRef<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('asteroid-avoider-high-score') || '0'),
    level: 1
  })

  // Game objects refs
  const playerRef = useRef<Player>({
    x: GAME_CONFIG.CANVAS_WIDTH / 2,
    y: GAME_CONFIG.CANVAS_HEIGHT / 2,
    vx: 0,
    vy: 0,
    size: GAME_CONFIG.PLAYER_SIZE,
    trail: []
  })
  const asteroidsRef = useRef<Asteroid[]>([])
  const particlesRef = useRef<Particle[]>([])

  // Input handling refs
  const keysRef = useRef<Set<string>>(new Set())
  const touchRef = useRef<{ x: number; y: number } | null>(null)

  // React state for UI
  const [gameState, setGameState] = useState(gameStateRef.current)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showInstructions, setShowInstructions] = useState(true)

  // Sound effects (using Web Audio API)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // Play sound effect
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!soundEnabled || !audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = type
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)
    
    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }, [soundEnabled])

  // Create explosion particles
  const createExplosion = useCallback((x: number, y: number, color: string = '#ff6b35') => {
    for (let i = 0; i < GAME_CONFIG.PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / GAME_CONFIG.PARTICLE_COUNT
      const speed = Math.random() * 5 + 2
      
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        life: GAME_CONFIG.PARTICLE_LIFE,
        color,
        alpha: 1
      })
    }
    playSound(150, 0.3, 'sawtooth')
  }, [playSound])

  // Spawn new asteroid
  const spawnAsteroid = useCallback(() => {
    const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
    let x, y, vx, vy
    
    const size = Math.random() * (GAME_CONFIG.ASTEROID_MAX_SIZE - GAME_CONFIG.ASTEROID_MIN_SIZE) + GAME_CONFIG.ASTEROID_MIN_SIZE
    const speed = Math.random() * (GAME_CONFIG.ASTEROID_SPEED_MAX - GAME_CONFIG.ASTEROID_SPEED_MIN) + GAME_CONFIG.ASTEROID_SPEED_MIN
    
    switch (side) {
      case 0: // top
        x = Math.random() * GAME_CONFIG.CANVAS_WIDTH
        y = -size
        vx = (Math.random() - 0.5) * 2
        vy = speed
        break
      case 1: // right
        x = GAME_CONFIG.CANVAS_WIDTH + size
        y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT
        vx = -speed
        vy = (Math.random() - 0.5) * 2
        break
      case 2: // bottom
        x = Math.random() * GAME_CONFIG.CANVAS_WIDTH
        y = GAME_CONFIG.CANVAS_HEIGHT + size
        vx = (Math.random() - 0.5) * 2
        vy = -speed
        break
      default: // left
        x = -size
        y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT
        vx = speed
        vy = (Math.random() - 0.5) * 2
        break
    }
    
    asteroidsRef.current.push({
      x,
      y,
      vx,
      vy,
      size,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.1
    })
  }, [])

  // Check collision between two circular objects
  const checkCollision = useCallback((obj1: GameObject, obj2: GameObject): boolean => {
    const dx = obj1.x - obj2.x
    const dy = obj1.y - obj2.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < (obj1.size + obj2.size) / 2
  }, [])

  // End game
  const endGame = useCallback(() => {
    gameStateRef.current.isPlaying = false
    
    // Update high score
    if (gameStateRef.current.score > gameStateRef.current.highScore) {
      gameStateRef.current.highScore = gameStateRef.current.score
      localStorage.setItem('asteroid-avoider-high-score', gameStateRef.current.score.toString())
      playSound(880, 1, 'triangle')
    }
    
    setGameState({ ...gameStateRef.current })
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [playSound])

  // Update game objects
  const updateGame = useCallback(() => {
    if (!gameStateRef.current.isPlaying || gameStateRef.current.isPaused) return

    const player = playerRef.current
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    // Update player position based on input
    player.vx *= 0.95 // friction
    player.vy *= 0.95

    // Keyboard controls
    if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a') || keysRef.current.has('A')) {
      player.vx -= 0.5
    }
    if (keysRef.current.has('ArrowRight') || keysRef.current.has('d') || keysRef.current.has('D')) {
      player.vx += 0.5
    }
    if (keysRef.current.has('ArrowUp') || keysRef.current.has('w') || keysRef.current.has('W')) {
      player.vy -= 0.5
    }
    if (keysRef.current.has('ArrowDown') || keysRef.current.has('s') || keysRef.current.has('S')) {
      player.vy += 0.5
    }

    // Touch controls
    if (touchRef.current) {
      const targetX = touchRef.current.x
      const targetY = touchRef.current.y
      const dx = targetX - player.x
      const dy = targetY - player.y
      player.vx += dx * 0.01
      player.vy += dy * 0.01
    }

    // Cap player speed
    const speed = Math.sqrt(player.vx * player.vx + player.vy * player.vy)
    if (speed > GAME_CONFIG.PLAYER_SPEED) {
      player.vx = (player.vx / speed) * GAME_CONFIG.PLAYER_SPEED
      player.vy = (player.vy / speed) * GAME_CONFIG.PLAYER_SPEED
    }

    // Update player position
    player.x += player.vx
    player.y += player.vy

    // Keep player in bounds
    player.x = Math.max(player.size, Math.min(GAME_CONFIG.CANVAS_WIDTH - player.size, player.x))
    player.y = Math.max(player.size, Math.min(GAME_CONFIG.CANVAS_HEIGHT - player.size, player.y))

    // Update player trail
    player.trail.push({ x: player.x, y: player.y })
    if (player.trail.length > 10) {
      player.trail.shift()
    }

    // Spawn asteroids
    if (Math.random() < GAME_CONFIG.ASTEROID_SPAWN_RATE + gameStateRef.current.level * 0.005) {
      spawnAsteroid()
    }

    // Update asteroids
    for (let i = asteroidsRef.current.length - 1; i >= 0; i--) {
      const asteroid = asteroidsRef.current[i]
      asteroid.x += asteroid.vx
      asteroid.y += asteroid.vy
      asteroid.rotation += asteroid.rotationSpeed

      // Remove asteroids that are off-screen
      if (
        asteroid.x < -asteroid.size ||
        asteroid.x > GAME_CONFIG.CANVAS_WIDTH + asteroid.size ||
        asteroid.y < -asteroid.size ||
        asteroid.y > GAME_CONFIG.CANVAS_HEIGHT + asteroid.size
      ) {
        asteroidsRef.current.splice(i, 1)
      }
    }

    // Update particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const particle = particlesRef.current[i]
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life--
      particle.alpha = particle.life / GAME_CONFIG.PARTICLE_LIFE

      if (particle.life <= 0) {
        particlesRef.current.splice(i, 1)
      }
    }

    // Check collisions
    for (const asteroid of asteroidsRef.current) {
      if (checkCollision(player, asteroid)) {
        // Game over
        createExplosion(player.x, player.y, '#ff6b35')
        endGame()
        return
      }
    }

    // Update score
    gameStateRef.current.score += 1
    
    // Level up every 1000 points
    const newLevel = Math.floor(gameStateRef.current.score / 1000) + 1
    if (newLevel > gameStateRef.current.level) {
      gameStateRef.current.level = newLevel
      playSound(800, 0.5, 'square')
    }

    // Update React state
    setGameState({ ...gameStateRef.current })
  }, [checkCollision, createExplosion, spawnAsteroid, playSound, endGame])

  // Render game
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#0a0a0a')
    gradient.addColorStop(1, '#1a0a2a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add stars
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 100; i++) {
      const x = (i * 123) % canvas.width
      const y = (i * 456) % canvas.height
      const twinkle = Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5
      ctx.globalAlpha = twinkle * 0.8
      ctx.fillRect(x, y, 1, 1)
    }
    ctx.globalAlpha = 1

    if (gameStateRef.current.isPlaying) {
      const player = playerRef.current

      // Draw player trail
      ctx.strokeStyle = '#00ffff'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i < player.trail.length; i++) {
        const point = player.trail[i]
        const alpha = (i + 1) / player.trail.length
        ctx.globalAlpha = alpha * 0.5
        if (i === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      }
      ctx.stroke()
      ctx.globalAlpha = 1

      // Draw player
      ctx.save()
      ctx.translate(player.x, player.y)
      ctx.fillStyle = '#00ffff'
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      
      // Player ship shape
      ctx.beginPath()
      ctx.moveTo(0, -player.size / 2)
      ctx.lineTo(-player.size / 3, player.size / 2)
      ctx.lineTo(0, player.size / 3)
      ctx.lineTo(player.size / 3, player.size / 2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      
      // Engine glow
      if (keysRef.current.size > 0 || touchRef.current) {
        ctx.fillStyle = '#ff6b35'
        ctx.beginPath()
        ctx.moveTo(-player.size / 4, player.size / 2)
        ctx.lineTo(0, player.size)
        ctx.lineTo(player.size / 4, player.size / 2)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()

      // Draw asteroids
      ctx.fillStyle = '#8b4513'
      ctx.strokeStyle = '#654321'
      ctx.lineWidth = 2
      for (const asteroid of asteroidsRef.current) {
        ctx.save()
        ctx.translate(asteroid.x, asteroid.y)
        ctx.rotate(asteroid.rotation)
        
        // Irregular asteroid shape
        ctx.beginPath()
        const points = 8
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2
          const variation = 0.8 + Math.sin(i * 1.3) * 0.2
          const radius = (asteroid.size / 2) * variation
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      }

      // Draw particles
      for (const particle of particlesRef.current) {
        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }
  }, [])

  // Game loop
  const gameLoop = useCallback(() => {
    updateGame()
    render()
    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [updateGame, render])

  // Start game
  const startGame = useCallback(() => {
    initAudio()
    gameStateRef.current.isPlaying = true
    gameStateRef.current.isPaused = false
    gameStateRef.current.score = 0
    gameStateRef.current.level = 1
    
    // Reset player position
    playerRef.current.x = GAME_CONFIG.CANVAS_WIDTH / 2
    playerRef.current.y = GAME_CONFIG.CANVAS_HEIGHT / 2
    playerRef.current.vx = 0
    playerRef.current.vy = 0
    playerRef.current.trail = []
    
    // Clear arrays
    asteroidsRef.current = []
    particlesRef.current = []
    
    setGameState({ ...gameStateRef.current })
    setShowInstructions(false)
    
    gameLoop()
    playSound(440, 0.3, 'square')
  }, [gameLoop, initAudio, playSound])

  // Toggle pause
  const togglePause = useCallback(() => {
    if (!gameStateRef.current.isPlaying) return
    
    gameStateRef.current.isPaused = !gameStateRef.current.isPaused
    setGameState({ ...gameStateRef.current })
    
    if (!gameStateRef.current.isPaused) {
      gameLoop()
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    playSound(330, 0.2)
  }, [gameLoop, playSound])

  // Event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key)
      
      // Prevent default behavior for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault()
      }
      
      // Space to pause/unpause
      if (e.key === ' ') {
        togglePause()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!gameStateRef.current.isPlaying) return
      e.preventDefault()
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const touch = e.touches[0]
      touchRef.current = {
        x: ((touch.clientX - rect.left) / rect.width) * GAME_CONFIG.CANVAS_WIDTH,
        y: ((touch.clientY - rect.top) / rect.height) * GAME_CONFIG.CANVAS_HEIGHT
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!gameStateRef.current.isPlaying || !touchRef.current) return
      e.preventDefault()
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const touch = e.touches[0]
      touchRef.current = {
        x: ((touch.clientX - rect.left) / rect.width) * GAME_CONFIG.CANVAS_WIDTH,
        y: ((touch.clientY - rect.top) / rect.height) * GAME_CONFIG.CANVAS_HEIGHT
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      touchRef.current = null
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false })
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouchStart)
        canvas.removeEventListener('touchmove', handleTouchMove)
        canvas.removeEventListener('touchend', handleTouchEnd)
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [togglePause])

  // Initial render
  useEffect(() => {
    render()
  }, [render])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Asteroid Avoider
          </h1>
          <p className="text-gray-300 text-sm">Navigate through space and survive as long as possible</p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-4 text-white">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-lg">Score: {gameState.score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-mono text-lg">Best: {gameState.highScore}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="font-mono text-lg">Level: {gameState.level}</span>
            </div>
          </div>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            {soundEnabled ? 
              <Volume2 className="w-5 h-5 text-white" /> : 
              <VolumeX className="w-5 h-5 text-gray-400" />
            }
          </button>
        </div>

        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={GAME_CONFIG.CANVAS_WIDTH}
            height={GAME_CONFIG.CANVAS_HEIGHT}
            className="border-2 border-cyan-500/30 rounded-lg bg-black/50 max-w-full h-auto"
            style={{
              maxWidth: '100%',
              height: 'auto',
              aspectRatio: `${GAME_CONFIG.CANVAS_WIDTH} / ${GAME_CONFIG.CANVAS_HEIGHT}`
            }}
          />

          {/* Game Over / Paused Overlay */}
          <AnimatePresence>
            {(!gameState.isPlaying || gameState.isPaused) && (
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center text-white">
                  {gameState.isPaused ? (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Paused</h2>
                      <p className="text-gray-300 mb-6">Press SPACE or click Resume to continue</p>
                    </>
                  ) : !gameState.isPlaying && gameState.score > 0 ? (
                    <>
                      <h2 className="text-3xl font-bold mb-4 text-red-400">Game Over!</h2>
                      <p className="text-gray-300 mb-2">Final Score: {gameState.score}</p>
                      <p className="text-gray-300 mb-6">Level Reached: {gameState.level}</p>
                      {gameState.score === gameState.highScore && (
                        <p className="text-yellow-400 mb-4 font-bold">🏆 New High Score! 🏆</p>
                      )}
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Welcome to Asteroid Avoider</h2>
                      {showInstructions && (
                        <div className="text-gray-300 mb-6 space-y-2">
                          <p>🚀 Control your ship with WASD or Arrow Keys</p>
                          <p>📱 On mobile, touch to move</p>
                          <p>⏸️ Press SPACE to pause</p>
                          <p>🎯 Avoid asteroids and survive as long as possible!</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          {!gameState.isPlaying ? (
            <motion.button
              onClick={startGame}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>{gameState.score > 0 ? 'Play Again' : 'Start Game'}</span>
            </motion.button>
          ) : (
            <>
              <motion.button
                onClick={togglePause}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {gameState.isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                <span>{gameState.isPaused ? 'Resume' : 'Pause'}</span>
              </motion.button>
              
              <motion.button
                onClick={() => {
                  endGame()
                  setTimeout(startGame, 100)
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5" />
                <span>Restart</span>
              </motion.button>
            </>
          )}
        </div>

        {/* Instructions Toggle */}
        {!showInstructions && !gameState.isPlaying && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowInstructions(true)}
              className="text-cyan-400 hover:text-cyan-300 text-sm underline transition-colors"
            >
              Show Instructions
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AsteroidAvoider