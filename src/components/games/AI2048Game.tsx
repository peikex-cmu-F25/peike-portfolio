import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Board = number[][]
type Direction = 'up' | 'down' | 'left' | 'right'

const BOARD_SIZE = 4
const INITIAL_TILES = 2
const AI_SEARCH_DEPTH = 4
const AUTO_PLAY_INTERVAL = 450

const DIRECTIONS: Direction[] = ['up', 'left', 'down', 'right']

interface MoveResult {
  board: Board
  moved: boolean
  scoreGained: number
}

const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0))

const cloneBoard = (board: Board): Board => board.map(row => [...row])

const getEmptyCells = (board: Board) => {
  const cells: Array<[number, number]> = []
  board.forEach((row, r) =>
    row.forEach((value, c) => {
      if (value === 0) cells.push([r, c])
    })
  )
  return cells
}

const addRandomTile = (board: Board) => {
  const cells = getEmptyCells(board)
  if (cells.length === 0) return board
  const index = Math.floor(Math.random() * cells.length)
  const [row, col] = cells[index]
  const value = Math.random() < 0.9 ? 2 : 4
  board[row][col] = value
  return board
}

const initialiseBoard = (): Board => {
  let board = createEmptyBoard()
  for (let i = 0; i < INITIAL_TILES; i++) {
    board = addRandomTile(board)
  }
  return board
}

const slide = (row: number[]) => {
  const filtered = row.filter(value => value !== 0)
  const padded = [...filtered]
  while (padded.length < BOARD_SIZE) padded.push(0)
  return padded
}

const combineRow = (row: number[]) => {
  let score = 0
  for (let i = 0; i < BOARD_SIZE - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2
      row[i + 1] = 0
      score += row[i]
    }
  }
  return { row, score }
}

const operateRow = (row: number[]) => {
  const slidRow = slide(row)
  const { row: combinedRow, score } = combineRow(slidRow)
  const finalRow = slide(combinedRow)
  return { row: finalRow, score }
}

const transpose = (board: Board): Board =>
  board[0].map((_, col) => board.map(row => row[col]))

const reverseRows = (board: Board): Board =>
  board.map(row => [...row].reverse())

const move = (board: Board, direction: Direction): MoveResult => {
  let workingBoard = cloneBoard(board)
  let scoreGained = 0

  if (direction === 'up' || direction === 'down') {
    workingBoard = transpose(workingBoard)
  }

  if (direction === 'right' || direction === 'down') {
    workingBoard = reverseRows(workingBoard)
  }

  const newBoard = workingBoard.map(row => {
    const { row: newRow, score } = operateRow(row)
    scoreGained += score
    return newRow
  })

  let finalBoard = newBoard
  if (direction === 'right' || direction === 'down') {
    finalBoard = reverseRows(finalBoard)
  }
  if (direction === 'up' || direction === 'down') {
    finalBoard = transpose(finalBoard)
  }

  const moved = JSON.stringify(board) !== JSON.stringify(finalBoard)
  return { board: finalBoard, moved, scoreGained }
}

const getAvailableMoves = (board: Board) =>
  DIRECTIONS.filter(direction => move(board, direction).moved)

const isGameOver = (board: Board) =>
  getAvailableMoves(board).length === 0 && getEmptyCells(board).length === 0

const evaluateBoard = (board: Board) => {
  const weights = {
    empty: 250,
    maxTile: 1,
    monotonicity: 47,
    smoothness: 14
  }

  let emptyCells = 0
  let maxTile = 0
  let smoothness = 0
  let monotonicity = 0

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const value = board[r][c]
      if (value === 0) {
        emptyCells += 1
      } else {
        if (value > maxTile) maxTile = value

        if (c < BOARD_SIZE - 1) {
          smoothness -= Math.abs(value - board[r][c + 1])
          if (value >= board[r][c + 1]) monotonicity += 1
        }

        if (r < BOARD_SIZE - 1) {
          smoothness -= Math.abs(value - board[r + 1][c])
        }
      }
    }
  }

  return (
    emptyCells * weights.empty +
    maxTile * weights.maxTile +
    smoothness * weights.smoothness +
    monotonicity * weights.monotonicity
  )
}

const expectimax = (board: Board, depth: number, isMaxTurn: boolean): { value: number; move?: Direction } => {
  if (depth === 0 || isGameOver(board)) {
    return { value: evaluateBoard(board) }
  }

  if (isMaxTurn) {
    let bestValue = -Infinity
    let bestMove: Direction | undefined
    for (const direction of getAvailableMoves(board)) {
      const { board: nextBoard, scoreGained } = move(board, direction)
      const { value } = expectimax(nextBoard, depth - 1, false)
      const totalValue = value + scoreGained * 10
      if (totalValue > bestValue) {
        bestValue = totalValue
        bestMove = direction
      }
    }
    return { value: bestValue, move: bestMove }
  }

  const emptyCells = getEmptyCells(board)
  if (emptyCells.length === 0) {
    return expectimax(board, depth - 1, true)
  }

  let total = 0
  for (const [row, col] of emptyCells) {
    for (const [tileValue, probability] of [
      [2, 0.9],
      [4, 0.1]
    ] as const) {
      const newBoard = cloneBoard(board)
      newBoard[row][col] = tileValue
      const { value } = expectimax(newBoard, depth - 1, true)
      total += probability * value
    }
  }
  return { value: total / emptyCells.length }
}

const formatScore = (score: number) => score.toLocaleString('en-US')

const Tile = ({ value }: { value: number }) => {
  const tileValue = value === 0 ? '' : value
  const gradient = useMemo(() => {
    if (!value) return 'bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800'
    if (value <= 4) return 'bg-primary-100 text-primary-900'
    if (value <= 32) return 'bg-blue-200 text-blue-900'
    if (value <= 128) return 'bg-emerald-300 text-emerald-950'
    if (value <= 512) return 'bg-amber-300 text-amber-900'
    return 'bg-rose-400 text-white'
  }, [value])

  return (
    <motion.div
      layout
      className={`flex h-16 w-16 items-center justify-center rounded-xl border border-white/30 font-semibold text-xl shadow-inner dark:border-neutral-700 ${gradient}`}
    >
      {tileValue}
    </motion.div>
  )
}

const AI2048Game = () => {
  const [board, setBoard] = useState<Board>(() => initialiseBoard())
  const [score, setScore] = useState(0)
  const [bestMove, setBestMove] = useState<Direction | null>(null)
  const [autoPlay, setAutoPlay] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const animationFrame = useRef<number | null>(null)

  const resetGame = useCallback(() => {
    setBoard(initialiseBoard())
    setScore(0)
    setBestMove(null)
    setAutoPlay(false)
    setIsBusy(false)
    setGameOver(false)
  }, [])

  const runMove = useCallback(
    (direction: Direction) => {
      setBoard(prev => {
        const { board: movedBoard, moved, scoreGained } = move(prev, direction)
        if (!moved) return prev

        const withTile = addRandomTile(cloneBoard(movedBoard))
        setScore(prevScore => prevScore + scoreGained)
        setGameOver(isGameOver(withTile))
        return withTile
      })
    },
    []
  )

  const computeBestMove = useCallback(
    (currentBoard: Board) => {
      const outcome = expectimax(currentBoard, AI_SEARCH_DEPTH, true)
      return outcome.move ?? null
    },
    []
  )

  const handleAIMove = useCallback(() => {
    if (isBusy || gameOver) return
    setIsBusy(true)
    setTimeout(() => {
      setBestMove(prev => prev) // keep highlight
      setBoard(prev => {
        const moveDirection = computeBestMove(prev)
        if (!moveDirection) {
          setGameOver(true)
          return prev
        }
        setBestMove(moveDirection)
        const { board: movedBoard, moved, scoreGained } = move(prev, moveDirection)
        if (!moved) {
          setGameOver(isGameOver(prev))
          return prev
        }
        const withTile = addRandomTile(cloneBoard(movedBoard))
        setScore(prevScore => prevScore + scoreGained)
        setGameOver(isGameOver(withTile))
        return withTile
      })
      setIsBusy(false)
    }, 0)
  }, [computeBestMove, gameOver, isBusy])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isBusy || gameOver) return
      const map: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
      }
      const direction = map[event.key]
      if (direction) {
        event.preventDefault()
        runMove(direction)
        setBestMove(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameOver, isBusy, runMove])

  useEffect(() => {
    if (!autoPlay || gameOver) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      return
    }

    const step = (timestamp: number) => {
      animationFrame.current = requestAnimationFrame(nextTimestamp => {
        if (nextTimestamp - timestamp >= AUTO_PLAY_INTERVAL) {
          handleAIMove()
        } else {
          step(timestamp)
        }
      })
    }

    animationFrame.current = requestAnimationFrame(timestamp => step(timestamp))
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [autoPlay, gameOver, handleAIMove])

  useEffect(() => {
    if (!gameOver) {
      const suggestion = computeBestMove(board)
      setBestMove(suggestion)
    }
  }, [board, computeBestMove, gameOver])

  return (
    <div className="card space-y-6 dark:shadow-none">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">2048 Expectimax AI</h3>
          <p className="text-sm text-secondary-600 dark:text-gray-300">
            This demo replays the expectimax agent used in my AI coursework. Toggle autoplay to let the agent chase
            higher tiles, or take over manually with your arrow keys.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setAutoPlay(prev => !prev)
              setBestMove(null)
            }}
          >
            {autoPlay ? 'Pause Auto-Play' : 'Auto-Play'}
          </button>
          <button type="button" className="btn-secondary" onClick={handleAIMove} disabled={isBusy || gameOver}>
            Step with AI
          </button>
          <button type="button" className="btn-primary" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-primary-50 p-4 text-center dark:bg-neutral-900">
          <p className="text-xs uppercase tracking-wide text-primary-700 dark:text-primary-200">Score</p>
          <p className="text-2xl font-semibold text-primary-900 dark:text-primary-200">{formatScore(score)}</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-center dark:bg-neutral-900">
          <p className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-200">Empty tiles</p>
          <p className="text-2xl font-semibold text-blue-900 dark:text-blue-200">
            {getEmptyCells(board).length.toString()}
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4 text-center dark:bg-neutral-900">
          <p className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-200">Max tile</p>
          <p className="text-2xl font-semibold text-emerald-900 dark:text-emerald-300">
            {Math.max(...board.flat())}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-neutral-900">
          <p className="text-xs uppercase tracking-wide text-slate-700 dark:text-slate-200">Status</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">
            {gameOver ? 'Game over' : autoPlay ? 'Auto' : 'Manual'}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-4 gap-3 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 p-6 shadow-xl dark:from-neutral-900 dark:to-neutral-800 dark:shadow-none">
            <AnimatePresence>
              {board.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                  <Tile key={`${rowIndex}-${colIndex}-${value}`} value={value} />
                ))
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-secondary-500 dark:text-gray-400">
            Use arrow keys or tap “Step with AI” to advance. Autoplay mirrors the evaluation function from the original
            expectimax agent.
          </p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-secondary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-600 dark:text-gray-300">
              Suggested move
            </h4>
            <p className="mt-2 text-2xl font-semibold text-secondary-900 dark:text-white">
              {bestMove ? bestMove.toUpperCase() : 'No safe moves'}
            </p>
          </div>

          <div className="rounded-2xl border border-secondary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-600 dark:text-gray-300">
              Heuristic breakdown
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-secondary-600 dark:text-gray-300">
              <li>
                <span className="font-medium text-secondary-900 dark:text-white">Empty tiles:</span> encourages the AI to
                keep space for merges.
              </li>
              <li>
                <span className="font-medium text-secondary-900 dark:text-white">Monotonicity & smoothness:</span> pushes
                tiles into neat gradients to avoid chaos.
              </li>
              <li>
                <span className="font-medium text-secondary-900 dark:text-white">Max tile bonus:</span> rewards the agent
                for preserving high-value tiles.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-secondary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-600 dark:text-gray-300">
              Controls
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-secondary-600 dark:text-gray-300">
              <li>• Arrow keys: make a manual move</li>
              <li>• Step with AI: play the expectimax suggestion</li>
              <li>• Auto-Play: let the agent run continuously</li>
              <li>• Reset: start a fresh run with two tiles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AI2048Game
