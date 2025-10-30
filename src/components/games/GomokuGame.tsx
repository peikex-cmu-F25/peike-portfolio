import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Brain, 
  User, 
  Trophy, 
  Clock, 
  Settings,
  ChevronDown,
  Undo
} from 'lucide-react'

// Game configuration constants
const GAME_CONFIG = {
  BOARD_SIZE: 15, // Standard Gomoku board size
  CELL_SIZE: 30,
  BOARD_PADDING: 40,
  COLORS: {
    BACKGROUND: '#0f172a',
    BOARD: '#1e293b',
    GRID_LINE: '#374151',
    BLACK_STONE: '#1f2937',
    WHITE_STONE: '#f8fafc',
    BLACK_STONE_SHADOW: '#111827',
    WHITE_STONE_SHADOW: '#e2e8f0',
    HIGHLIGHT: '#3b82f6',
    WINNING_LINE: '#10b981',
    UI_PRIMARY: '#3b82f6',
    UI_SECONDARY: '#64748b',
    TEXT: '#f8fafc',
    AI_THINKING: '#8b5cf6'
  },
  AI_DIFFICULTY: {
    EASY: { budget: 500, name: 'Easy' },
    MEDIUM: { budget: 1500, name: 'Medium' },
    HARD: { budget: 3000, name: 'Hard' }
  }
} as const

// Type definitions
type Player = 'black' | 'white' | null
type GameStatus = 'menu' | 'playing' | 'thinking' | 'finished'
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

interface Position {
  row: number
  col: number
}

interface Move extends Position {
  player: Player
  moveNumber: number
}

interface GameState {
  board: Player[][]
  currentPlayer: Player
  status: GameStatus
  winner: Player
  winningLine: Position[] | null
  moveHistory: Move[]
  isAIEnabled: boolean
  difficulty: Difficulty
  lastMove: Position | null
}

// MCTS Node class implementation
class MCTSNode {
  public position: Position | null
  public player: Player
  public parent: MCTSNode | null
  public children: MCTSNode[]
  public visits: number
  public wins: number
  public qValue: number
  public isFullyExpanded: boolean

  constructor(
    position: Position | null = null, 
    player: Player = 'black', 
    parent: MCTSNode | null = null
  ) {
    this.position = position
    this.player = player
    this.parent = parent
    this.children = []
    this.visits = 0
    this.wins = 0
    this.qValue = 0
    this.isFullyExpanded = false
  }

  // UCB1 (Upper Confidence Bound) selection formula
  public getUCBValue(explorationConstant: number = Math.sqrt(2)): number {
    if (this.visits === 0) return Infinity
    
    const exploitation = this.wins / this.visits
    const exploration = explorationConstant * Math.sqrt(Math.log(this.parent!.visits) / this.visits)
    const qLearningComponent = 0.1 * this.qValue // Q-Learning integration
    
    return exploitation + exploration + qLearningComponent
  }

  public addChild(position: Position, player: Player): MCTSNode {
    const child = new MCTSNode(position, player, this)
    this.children.push(child)
    return child
  }

  public updateStats(result: number): void {
    this.visits++
    this.wins += result
    
    // Q-Learning update with learning rate
    const learningRate = 0.1
    const discount = 0.9
    this.qValue = (1 - learningRate) * this.qValue + learningRate * (result + discount * this.getBestChildQValue())
  }

  private getBestChildQValue(): number {
    if (this.children.length === 0) return 0
    return Math.max(...this.children.map(child => child.qValue))
  }

  public selectBestChild(explorationConstant: number = Math.sqrt(2)): MCTSNode {
    return this.children.reduce((best, child) => 
      child.getUCBValue(explorationConstant) > best.getUCBValue(explorationConstant) ? child : best
    )
  }
}

// Game utility functions
class GomokuGameLogic {
  private static readonly DIRECTIONS = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal /
    [1, -1]   // diagonal \
  ]

  public static createEmptyBoard(size: number = GAME_CONFIG.BOARD_SIZE): Player[][] {
    return Array(size).fill(null).map(() => Array(size).fill(null))
  }

  public static makeMove(board: Player[][], row: number, col: number, player: Player): Player[][] {
    if (board[row][col] !== null) return board
    
    const newBoard = board.map(r => [...r])
    newBoard[row][col] = player
    return newBoard
  }

  public static checkWin(board: Player[][], lastMove: Position | null): { winner: Player; line: Position[] | null } {
    if (!lastMove) return { winner: null, line: null }
    
    const { row, col } = lastMove
    const player = board[row][col]
    
    if (!player) return { winner: null, line: null }

    for (const [dRow, dCol] of this.DIRECTIONS) {
      const line = this.getLineInDirection(board, row, col, dRow, dCol, player)
      if (line.length >= 5) {
        return { winner: player, line }
      }
    }

    return { winner: null, line: null }
  }

  private static getLineInDirection(
    board: Player[][], 
    startRow: number, 
    startCol: number, 
    dRow: number, 
    dCol: number, 
    player: Player
  ): Position[] {
    const line: Position[] = []
    const size = board.length

    // Check in positive direction
    let row = startRow
    let col = startCol
    while (row >= 0 && row < size && col >= 0 && col < size && board[row][col] === player) {
      line.push({ row, col })
      row += dRow
      col += dCol
    }

    // Check in negative direction (but don't include the starting position again)
    row = startRow - dRow
    col = startCol - dCol
    while (row >= 0 && row < size && col >= 0 && col < size && board[row][col] === player) {
      line.unshift({ row, col })
      row -= dRow
      col -= dCol
    }

    return line
  }

  public static getAvailableMoves(board: Player[][]): Position[] {
    const moves: Position[] = []
    const size = board.length

    // Only consider moves near existing stones for efficiency
    const consideredMoves = new Set<string>()

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== null) {
          // Add nearby empty positions
          for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -2; dc <= 2; dc++) {
              const newRow = row + dr
              const newCol = col + dc
              const key = `${newRow},${newCol}`
              
              if (
                newRow >= 0 && newRow < size &&
                newCol >= 0 && newCol < size &&
                board[newRow][newCol] === null &&
                !consideredMoves.has(key)
              ) {
                moves.push({ row: newRow, col: newCol })
                consideredMoves.add(key)
              }
            }
          }
        }
      }
    }

    // If no stones are placed yet, start from center
    if (moves.length === 0) {
      const center = Math.floor(size / 2)
      moves.push({ row: center, col: center })
    }

    return moves
  }

  // Evaluation function for position strength
  public static evaluatePosition(board: Player[][], player: Player): number {
    let score = 0
    const opponent = player === 'black' ? 'white' : 'black'

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] === player) {
          score += this.evaluateStonePosition(board, row, col, player)
        } else if (board[row][col] === opponent) {
          score -= this.evaluateStonePosition(board, row, col, opponent)
        }
      }
    }

    return score
  }

  private static evaluateStonePosition(board: Player[][], row: number, col: number, player: Player): number {
    let score = 0

    for (const [dRow, dCol] of this.DIRECTIONS) {
      const lineScore = this.evaluateLineScore(board, row, col, dRow, dCol, player)
      score += lineScore
    }

    return score
  }

  private static evaluateLineScore(
    board: Player[][], 
    row: number, 
    col: number, 
    dRow: number, 
    dCol: number, 
    player: Player
  ): number {
    const line = this.getLineInDirection(board, row, col, dRow, dCol, player)
    const lineLength = line.length

    // Scoring based on line length and openness
    switch (lineLength) {
      case 5: return 100000  // Win
      case 4: return 10000   // Four in a row
      case 3: return 1000    // Three in a row
      case 2: return 100     // Two in a row
      case 1: return 10      // Single stone
      default: return 0
    }
  }

  public static isGameOver(board: Player[][], lastMove: Position | null): boolean {
    const { winner } = this.checkWin(board, lastMove)
    if (winner) return true
    
    // Check for draw (board full)
    return board.every(row => row.every(cell => cell !== null))
  }
}

// MCTS AI implementation
class MCTSAIPlayer {
  private budget: number
  private explorationConstant: number

  constructor(budget: number = 1000, explorationConstant: number = Math.sqrt(2)) {
    this.budget = budget
    this.explorationConstant = explorationConstant
  }

  public async getBestMove(
    board: Player[][], 
    player: Player,
    onProgress?: (progress: number) => void
  ): Promise<Position | null> {
    const availableMoves = GomokuGameLogic.getAvailableMoves(board)
    if (availableMoves.length === 0) return null

    const root = new MCTSNode(null, player)
    
    // Initialize children for all available moves
    for (const move of availableMoves) {
      root.addChild(move, player)
    }

    // MCTS iterations
    for (let iteration = 0; iteration < this.budget; iteration++) {
      const selectedNode = this.select(root, board)
      const expandedNode = this.expand(selectedNode, board)
      const result = await this.simulate(expandedNode, board, player)
      this.backpropagate(expandedNode, result)

      // Report progress
      if (onProgress && iteration % 50 === 0) {
        onProgress((iteration / this.budget) * 100)
      }
    }

    // Select best move based on visit count and win rate
    const bestChild = root.children.reduce((best, child) => {
      const bestScore = best.visits > 0 ? best.wins / best.visits : 0
      const childScore = child.visits > 0 ? child.wins / child.visits : 0
      return childScore > bestScore ? child : best
    })

    if (onProgress) onProgress(100)
    return bestChild.position
  }

  private select(node: MCTSNode, board: Player[][]): MCTSNode {
    while (node.children.length > 0 && node.isFullyExpanded) {
      node = node.selectBestChild(this.explorationConstant)
    }
    return node
  }

  private expand(node: MCTSNode, board: Player[][]): MCTSNode {
    if (node.position) {
      const newBoard = GomokuGameLogic.makeMove(board, node.position.row, node.position.col, node.player)
      
      if (GomokuGameLogic.isGameOver(newBoard, node.position)) {
        node.isFullyExpanded = true
        return node
      }

      const availableMoves = GomokuGameLogic.getAvailableMoves(newBoard)
      const nextPlayer = node.player === 'black' ? 'white' : 'black'

      if (node.children.length < availableMoves.length) {
        const unexploredMove = availableMoves.find(move => 
          !node.children.some(child => 
            child.position?.row === move.row && child.position?.col === move.col
          )
        )
        
        if (unexploredMove) {
          return node.addChild(unexploredMove, nextPlayer)
        }
      }

      node.isFullyExpanded = true
    }

    return node
  }

  private async simulate(node: MCTSNode, originalBoard: Player[][], originalPlayer: Player): Promise<number> {
    let board = originalBoard.map(row => [...row])
    let currentPlayer = node.player
    let currentMove = node.position

    // Apply the node's move if it exists
    if (currentMove) {
      board = GomokuGameLogic.makeMove(board, currentMove.row, currentMove.col, currentPlayer)
    }

    // Simulate random play until game end
    let moveCount = 0
    const maxMoves = 50 // Limit simulation depth

    while (!GomokuGameLogic.isGameOver(board, currentMove) && moveCount < maxMoves) {
      const availableMoves = GomokuGameLogic.getAvailableMoves(board)
      if (availableMoves.length === 0) break

      // Use some heuristics for better simulation
      const move = this.selectSimulationMove(board, availableMoves, currentPlayer)
      board = GomokuGameLogic.makeMove(board, move.row, move.col, currentPlayer)
      currentMove = move
      currentPlayer = currentPlayer === 'black' ? 'white' : 'black'
      moveCount++

      // Add small delay for progress updates
      if (moveCount % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0))
      }
    }

    // Evaluate final position
    const { winner } = GomokuGameLogic.checkWin(board, currentMove)
    if (winner === originalPlayer) return 1
    if (winner && winner !== originalPlayer) return 0
    
    // Use position evaluation for draws/incomplete games
    const evaluation = GomokuGameLogic.evaluatePosition(board, originalPlayer)
    return Math.max(0, Math.min(1, (evaluation + 1000) / 2000)) // Normalize to [0,1]
  }

  private selectSimulationMove(board: Player[][], availableMoves: Position[], player: Player): Position {
    // Simple heuristic: prefer moves that create or block threats
    let bestMove = availableMoves[0]
    let bestScore = -Infinity

    for (const move of availableMoves.slice(0, Math.min(10, availableMoves.length))) {
      const testBoard = GomokuGameLogic.makeMove(board, move.row, move.col, player)
      const score = GomokuGameLogic.evaluatePosition(testBoard, player)
      
      if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
    }

    return bestMove
  }

  private backpropagate(node: MCTSNode | null, result: number): void {
    while (node) {
      node.updateStats(result)
      node = node.parent
      result = 1 - result // Flip result for opponent
    }
  }
}

// Main Gomoku Game Component
const GomokuGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const aiPlayer = useRef<MCTSAIPlayer | null>(null)
  const [gameState, setGameState] = useState<GameState>({
    board: GomokuGameLogic.createEmptyBoard(),
    currentPlayer: 'black',
    status: 'menu',
    winner: null,
    winningLine: null,
    moveHistory: [],
    isAIEnabled: true,
    difficulty: 'MEDIUM',
    lastMove: null
  })
  const [aiProgress, setAiProgress] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  // Initialize AI player when difficulty changes
  useEffect(() => {
    const budget = GAME_CONFIG.AI_DIFFICULTY[gameState.difficulty].budget
    aiPlayer.current = new MCTSAIPlayer(budget)
  }, [gameState.difficulty])

  // Calculate canvas dimensions
  const canvasSize = useMemo(() => {
    const boardSize = GAME_CONFIG.BOARD_SIZE * GAME_CONFIG.CELL_SIZE
    return boardSize + GAME_CONFIG.BOARD_PADDING * 2
  }, [])

  // Draw the game board
  const drawBoard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { BOARD_SIZE, CELL_SIZE, BOARD_PADDING, COLORS } = GAME_CONFIG

    // Clear canvas
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw board background
    ctx.fillStyle = COLORS.BOARD
    ctx.fillRect(BOARD_PADDING, BOARD_PADDING, BOARD_SIZE * CELL_SIZE, BOARD_SIZE * CELL_SIZE)

    // Draw grid lines
    ctx.strokeStyle = COLORS.GRID_LINE
    ctx.lineWidth = 1

    for (let i = 0; i <= BOARD_SIZE; i++) {
      const pos = BOARD_PADDING + i * CELL_SIZE

      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(pos, BOARD_PADDING)
      ctx.lineTo(pos, BOARD_PADDING + BOARD_SIZE * CELL_SIZE)
      ctx.stroke()

      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(BOARD_PADDING, pos)
      ctx.lineTo(BOARD_PADDING + BOARD_SIZE * CELL_SIZE, pos)
      ctx.stroke()
    }

    // Draw star points (traditional Gomoku board markers)
    const starPoints = [
      [3, 3], [3, 11], [11, 3], [11, 11], [7, 7]
    ]
    
    ctx.fillStyle = COLORS.GRID_LINE
    for (const [row, col] of starPoints) {
      const x = BOARD_PADDING + col * CELL_SIZE
      const y = BOARD_PADDING + row * CELL_SIZE
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw stones
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const stone = gameState.board[row][col]
        if (stone) {
          drawStone(ctx, row, col, stone)
        }
      }
    }

    // Highlight last move
    if (gameState.lastMove) {
      const { row, col } = gameState.lastMove
      const x = BOARD_PADDING + col * CELL_SIZE
      const y = BOARD_PADDING + row * CELL_SIZE
      
      ctx.strokeStyle = COLORS.HIGHLIGHT
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(x, y, CELL_SIZE / 2 - 2, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw winning line
    if (gameState.winningLine) {
      ctx.strokeStyle = COLORS.WINNING_LINE
      ctx.lineWidth = 4
      ctx.beginPath()
      
      const firstPos = gameState.winningLine[0]
      const lastPos = gameState.winningLine[gameState.winningLine.length - 1]
      
      ctx.moveTo(
        BOARD_PADDING + firstPos.col * CELL_SIZE,
        BOARD_PADDING + firstPos.row * CELL_SIZE
      )
      ctx.lineTo(
        BOARD_PADDING + lastPos.col * CELL_SIZE,
        BOARD_PADDING + lastPos.row * CELL_SIZE
      )
      ctx.stroke()
    }
  }, [gameState.board, gameState.lastMove, gameState.winningLine])

  // Draw individual stone
  const drawStone = (ctx: CanvasRenderingContext2D, row: number, col: number, player: Player) => {
    const { CELL_SIZE, BOARD_PADDING, COLORS } = GAME_CONFIG
    const x = BOARD_PADDING + col * CELL_SIZE
    const y = BOARD_PADDING + row * CELL_SIZE
    const radius = CELL_SIZE / 2 - 2

    if (player === 'black') {
      // Black stone with gradient
      const gradient = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, radius)
      gradient.addColorStop(0, '#4b5563')
      gradient.addColorStop(1, COLORS.BLACK_STONE)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      
      // Shadow
      ctx.fillStyle = COLORS.BLACK_STONE_SHADOW
      ctx.beginPath()
      ctx.arc(x + 1, y + 1, radius, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // White stone with gradient
      const gradient = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, radius)
      gradient.addColorStop(0, '#ffffff')
      gradient.addColorStop(1, COLORS.WHITE_STONE)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      
      // Border
      ctx.strokeStyle = COLORS.WHITE_STONE_SHADOW
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  // Handle canvas click
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState.status !== 'playing' || (gameState.isAIEnabled && gameState.currentPlayer === 'white')) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Convert to board coordinates
    const col = Math.round((x - GAME_CONFIG.BOARD_PADDING) / GAME_CONFIG.CELL_SIZE)
    const row = Math.round((y - GAME_CONFIG.BOARD_PADDING) / GAME_CONFIG.CELL_SIZE)

    // Validate move
    if (row < 0 || row >= GAME_CONFIG.BOARD_SIZE || col < 0 || col >= GAME_CONFIG.BOARD_SIZE) {
      return
    }

    if (gameState.board[row][col] !== null) {
      return
    }

    makeMove(row, col)
  }, [gameState])

  // Make a move
  const makeMove = useCallback((row: number, col: number) => {
    setGameState(prevState => {
      const newBoard = GomokuGameLogic.makeMove(prevState.board, row, col, prevState.currentPlayer)
      const { winner, line } = GomokuGameLogic.checkWin(newBoard, { row, col })
      
      const newMove: Move = {
        row,
        col,
        player: prevState.currentPlayer,
        moveNumber: prevState.moveHistory.length + 1
      }

      const newState: GameState = {
        ...prevState,
        board: newBoard,
        currentPlayer: prevState.currentPlayer === 'black' ? 'white' : 'black',
        winner,
        winningLine: line,
        moveHistory: [...prevState.moveHistory, newMove],
        lastMove: { row, col },
        status: winner ? 'finished' : 'playing'
      }

      // If AI is enabled and it's AI's turn, trigger AI move
      if (!winner && newState.isAIEnabled && newState.currentPlayer === 'white') {
        newState.status = 'thinking'
      }

      return newState
    })
  }, [])

  // AI move effect
  useEffect(() => {
    if (gameState.status === 'thinking' && aiPlayer.current) {
      const makeAIMove = async () => {
        setAiProgress(0)
        
        try {
          const aiMove = await aiPlayer.current!.getBestMove(
            gameState.board,
            gameState.currentPlayer,
            setAiProgress
          )

          if (aiMove) {
            // Add slight delay for better UX
            setTimeout(() => {
              makeMove(aiMove.row, aiMove.col)
            }, 500)
          }
        } catch (error) {
          console.error('AI move failed:', error)
          setGameState(prev => ({ ...prev, status: 'playing' }))
        }
      }

      makeAIMove()
    }
  }, [gameState.status, gameState.board, gameState.currentPlayer, makeMove])

  // Redraw canvas when game state changes
  useEffect(() => {
    drawBoard()
  }, [drawBoard])

  // Game control functions
  const startNewGame = useCallback(() => {
    setGameState({
      board: GomokuGameLogic.createEmptyBoard(),
      currentPlayer: 'black',
      status: 'playing',
      winner: null,
      winningLine: null,
      moveHistory: [],
      isAIEnabled: gameState.isAIEnabled,
      difficulty: gameState.difficulty,
      lastMove: null
    })
    setAiProgress(0)
  }, [gameState.isAIEnabled, gameState.difficulty])

  const undoLastMove = useCallback(() => {
    setGameState(prevState => {
      if (prevState.moveHistory.length === 0) return prevState

      const newHistory = [...prevState.moveHistory]
      
      // If playing against AI, undo both AI and human moves
      if (prevState.isAIEnabled && newHistory.length >= 2) {
        newHistory.pop() // Remove AI move
        newHistory.pop() // Remove human move
      } else if (!prevState.isAIEnabled) {
        newHistory.pop() // Remove last move
      } else {
        return prevState // Can't undo if only one move and playing against AI
      }

      // Reconstruct board from history
      const newBoard = GomokuGameLogic.createEmptyBoard()
      for (const move of newHistory) {
        newBoard[move.row][move.col] = move.player
      }

      const lastMove = newHistory.length > 0 ? newHistory[newHistory.length - 1] : null

      return {
        ...prevState,
        board: newBoard,
        currentPlayer: newHistory.length % 2 === 0 ? 'black' : 'white',
        status: 'playing',
        winner: null,
        winningLine: null,
        moveHistory: newHistory,
        lastMove: lastMove ? { row: lastMove.row, col: lastMove.col } : null
      }
    })
  }, [])

  const toggleAI = useCallback(() => {
    setGameState(prev => ({ ...prev, isAIEnabled: !prev.isAIEnabled }))
  }, [])

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }))
    setShowSettings(false)
  }, [])

  // Menu screen
  if (gameState.status === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Gomoku
            </h1>
            <p className="text-xl text-slate-300">Five in a Row with AI</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
              <Brain className="w-6 h-6 text-purple-400" />
              <span>AI Opponent:</span>
              <button
                onClick={toggleAI}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  gameState.isAIEnabled
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
              >
                {gameState.isAIEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {gameState.isAIEnabled && (
              <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
                <Settings className="w-6 h-6 text-blue-400" />
                <span>Difficulty:</span>
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                  >
                    {GAME_CONFIG.AI_DIFFICULTY[gameState.difficulty].name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 bg-slate-700 rounded-lg shadow-lg z-10"
                      >
                        {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((diff) => (
                          <button
                            key={diff}
                            onClick={() => changeDifficulty(diff)}
                            className="block w-full px-4 py-2 text-left hover:bg-slate-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
                          >
                            {GAME_CONFIG.AI_DIFFICULTY[diff].name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startNewGame}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-medium text-lg transition-all"
          >
            <Play className="w-6 h-6" />
            Start Game
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-900 text-white p-4">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Gomoku
          </h1>
          
          {gameState.status === 'thinking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 rounded-lg"
            >
              <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-sm">AI Thinking... {Math.round(aiProgress)}%</span>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={undoLastMove}
            disabled={gameState.moveHistory.length === 0 || gameState.status === 'thinking'}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Undo className="w-4 h-4" />
            Undo
          </button>
          
          <button
            onClick={startNewGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </button>
        </div>
      </div>

      {/* Game Status */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${gameState.currentPlayer === 'black' ? 'bg-gray-800' : 'bg-white border-2 border-gray-300'}`} />
          <span className="font-medium">
            {gameState.currentPlayer === 'black' ? 'Black' : 'White'} to play
            {gameState.isAIEnabled && gameState.currentPlayer === 'white' && ' (AI)'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span>Move {gameState.moveHistory.length}</span>
        </div>

        {gameState.winner && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg"
          >
            <Trophy className="w-5 h-5 text-green-400" />
            <span className="font-bold">
              {gameState.winner === 'black' ? 'Black' : 'White'} Wins!
            </span>
          </motion.div>
        )}
      </div>

      {/* Game Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onClick={handleCanvasClick}
          className="border-2 border-slate-700 rounded-lg cursor-pointer bg-slate-800 shadow-2xl"
          style={{
            maxWidth: '90vw',
            maxHeight: '90vw',
            width: 'auto',
            height: 'auto'
          }}
        />
        
        {/* AI Progress Overlay */}
        <AnimatePresence>
          {gameState.status === 'thinking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"
            >
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3 animate-pulse" />
                <p className="text-lg font-medium mb-2">AI is thinking...</p>
                <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${aiProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-slate-400 mt-2">{Math.round(aiProgress)}% complete</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Game Instructions */}
      <div className="mt-6 text-center text-slate-400 max-w-2xl">
        <p className="text-sm">
          Click on intersections to place stones. Get five in a row to win!
          {gameState.isAIEnabled && " You play as Black, AI plays as White."}
        </p>
      </div>
    </div>
  )
}

export default GomokuGame