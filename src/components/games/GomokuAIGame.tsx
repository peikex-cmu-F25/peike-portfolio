import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const BOARD_SIZE = 11
const WIN_LENGTH = 5

type Cell = 'b' | 'w' | '.'
type Board = Cell[][]

interface Move {
  row: number
  col: number
}

const createBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array<Cell>(BOARD_SIZE).fill('.'))

const withinBounds = (row: number, col: number) =>
  row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE

const cloneBoard = (board: Board) => board.map(row => [...row])

const directions: Array<[number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1]
]

const checkWinner = (board: Board, row: number, col: number, player: Cell) => {
  for (const [dr, dc] of directions) {
    let count = 1
    for (const direction of [-1, 1]) {
      let r = row + dr * direction
      let c = col + dc * direction
      while (withinBounds(r, c) && board[r][c] === player) {
        count += 1
        r += dr * direction
        c += dc * direction
      }
    }
    if (count >= WIN_LENGTH) return true
  }
  return false
}

const evaluatorWeights = {
  own: [0, 2, 50, 400, 4000, 100000],
  opponent: [0, 1, 20, 200, 2000, 50000]
}

const evaluateMove = (board: Board, row: number, col: number, player: Cell) => {
  const opponent: Cell = player === 'b' ? 'w' : 'b'
  let score = 0

  const countDirectional = (dr: number, dc: number, target: Cell) => {
    let r = row + dr
    let c = col + dc
    let count = 0
    while (withinBounds(r, c) && board[r][c] === target) {
      count += 1
      r += dr
      c += dc
    }
    return count
  }

  for (const [dr, dc] of directions) {
    const own = countDirectional(dr, dc, player) + countDirectional(-dr, -dc, player)
    const opp = countDirectional(dr, dc, opponent) + countDirectional(-dr, -dc, opponent)
    score += evaluatorWeights.own[Math.min(own + 1, WIN_LENGTH)]
    score += evaluatorWeights.opponent[Math.min(opp + 1, WIN_LENGTH)]
  }

  return score
}

const getCandidateMoves = (board: Board): Move[] => {
  const moves: Move[] = []
  let minRow = BOARD_SIZE
  let maxRow = -1
  let minCol = BOARD_SIZE
  let maxCol = -1

  board.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell !== '.') {
        if (r < minRow) minRow = r
        if (r > maxRow) maxRow = r
        if (c < minCol) minCol = c
        if (c > maxCol) maxCol = c
      }
    })
  )

  if (maxRow === -1) {
    const center = Math.floor(BOARD_SIZE / 2)
    return [{ row: center, col: center }]
  }

  const padding = 2
  const startRow = Math.max(0, minRow - padding)
  const endRow = Math.min(BOARD_SIZE - 1, maxRow + padding)
  const startCol = Math.max(0, minCol - padding)
  const endCol = Math.min(BOARD_SIZE - 1, maxCol + padding)

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      if (board[r][c] === '.') {
        moves.push({ row: r, col: c })
      }
    }
  }

  return moves
}

const findBestMove = (board: Board, player: Cell) => {
  const moves = getCandidateMoves(board)
  let bestMove: Move | null = null
  let bestScore = -Infinity

  for (const move of moves) {
    const { row, col } = move
    board[row][col] = player
    const score = evaluateMove(board, row, col, player)
    board[row][col] = '.'

    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

const GomokuAIGame = () => {
  const [board, setBoard] = useState<Board>(() => createBoard())
  const [currentPlayer, setCurrentPlayer] = useState<Cell>('b')
  const [winner, setWinner] = useState<Cell | null>(null)
  const [lastMove, setLastMove] = useState<Move | null>(null)
  const [message, setMessage] = useState<string>('You play as black. Click a cell to start.')
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleReset = useCallback(() => {
    setBoard(createBoard())
    setCurrentPlayer('b')
    setWinner(null)
    setLastMove(null)
    setMessage('You play as black. Click a cell to start.')
  }, [])

  const handlePlayerMove = useCallback(
    (row: number, col: number) => {
      if (winner || currentPlayer !== 'b') return
      setBoard(prev => {
        if (prev[row][col] !== '.') return prev
        const next = cloneBoard(prev)
        next[row][col] = 'b'
        if (checkWinner(next, row, col, 'b')) {
          setWinner('b')
          setMessage('You win! Five in a row — nice capture.')
        } else {
          setCurrentPlayer('w')
          setMessage('My turn… thinking with heuristics honed from class exercises.')
        }
        setLastMove({ row, col })
        return next
      })
    },
    [currentPlayer, winner]
  )

  useEffect(() => {
    if (winner || currentPlayer !== 'w') return

    const timer = setTimeout(() => {
      setBoard(prev => {
        const bestMove = findBestMove(prev, 'w')
        if (!bestMove) {
          setWinner('b')
          setMessage('Looks like I have no moves left — you win!')
          return prev
        }
        const { row, col } = bestMove
        const next = cloneBoard(prev)
        next[row][col] = 'w'
        if (checkWinner(next, row, col, 'w')) {
          setWinner('w')
          setMessage('AI wins with a heuristic double-threat!')
        } else {
          setCurrentPlayer('b')
          setMessage('Your move. Block the patterns before they grow.')
        }
        setLastMove({ row, col })
        return next
      })
    }, prefersReducedMotion ? 150 : 350)

    return () => clearTimeout(timer)
  }, [currentPlayer, prefersReducedMotion, winner])

  const winningCells = useMemo(() => {
    if (!winner || !lastMove) return new Set<string>()
    const highlight = new Set<string>()
    for (const [dr, dc] of directions) {
      const cells: Array<[number, number]> = [[lastMove.row, lastMove.col]]
      for (const direction of [-1, 1] as const) {
        let r = lastMove.row + dr * direction
        let c = lastMove.col + dc * direction
        while (withinBounds(r, c) && board[r][c] === winner) {
          cells.push([r, c])
          r += dr * direction
          c += dc * direction
        }
      }
      if (cells.length >= WIN_LENGTH) {
        cells.forEach(([r, c]) => highlight.add(`${r}-${c}`))
        break
      }
    }
    return highlight
  }, [board, lastMove, winner])

  return (
    <div className="card space-y-6 dark:shadow-none">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Gomoku Heuristic Agent</h3>
          <p className="text-sm text-secondary-600 dark:text-gray-300">
            Black stones are yours, white stones are mine. This lightweight heuristic mirrors the evaluation patterns I
            used in my reinforcement + MCTS assignment—prioritising open-ended lines and double threats.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Reset board
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-3xl border border-secondary-200 bg-gradient-to-br from-slate-100 to-slate-300 p-4 shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800 dark:shadow-none">
            <div className="grid grid-cols-11 gap-1">
              {board.map((row, r) =>
                row.map((cell, c) => {
                  const key = `${r}-${c}`
                  const isLastMove = lastMove && lastMove.row === r && lastMove.col === c
                  const isWinning = winningCells.has(key)
                  const stone =
                    cell === '.' ? null : (
                      <motion.span
                        layout
                        className={`block h-5 w-5 rounded-full ${
                          cell === 'b' ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-white'
                        }`}
                      />
                    )
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handlePlayerMove(r, c)}
                      className={`relative flex h-8 w-8 items-center justify-center rounded-md border border-white/60 bg-gradient-to-br from-amber-100 to-amber-200 transition-all duration-150 dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-700 ${
                        cell === '.' && currentPlayer === 'b' && !winner
                          ? 'hover:border-primary-300 hover:shadow'
                          : ''
                      } ${isWinning ? 'ring-2 ring-primary-400' : ''}`}
                      disabled={cell !== '.' || currentPlayer !== 'b' || Boolean(winner)}
                    >
                      {stone}
                      {isLastMove && !prefersReducedMotion && (
                        <span className="absolute inset-1 animate-ping rounded-full border border-primary-200 dark:border-primary-600" />
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </div>
          <p className="text-xs text-secondary-500 dark:text-gray-400">
            Tip: build open-ended threes. The AI looks for the same patterns you learned about in lecture—so deny them!
          </p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-secondary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-600 dark:text-gray-300">
              Turn & status
            </h4>
            <p className="mt-2 text-2xl font-semibold text-secondary-900 dark:text-white">
              {winner
                ? winner === 'b'
                  ? 'You outplayed the agent!'
                  : 'AI wins — double threat detected.'
                : currentPlayer === 'b'
                  ? 'Your move'
                  : 'AI calculating…'}
            </p>
            <p className="mt-1 text-sm text-secondary-600 dark:text-gray-300">{message}</p>
          </div>

          <div className="rounded-2xl border border-secondary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-600 dark:text-gray-300">
              Evaluation heuristics
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-secondary-600 dark:text-gray-300">
              <li>
                <span className="font-medium text-secondary-900 dark:text-white">Open-ended sequences:</span> longer lines
                with two free ends are heavily weighted.
              </li>
              <li>
                <span className="font-medium text-secondary-900 dark:text-white">Blocking threats:</span> moves that deny
                your lines are valued nearly as high as building its own.
              </li>
              <li>
                <span className="font-medium text-secondary-900 dark:text-white">Double-attack potential:</span> patterns
                that spawn multiple wins next turn get priority.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-secondary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-600 dark:text-gray-300">
              How to play
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-secondary-600 dark:text-gray-300">
              <li>• Click any highlighted cell to place a black stone.</li>
              <li>• I respond with a heuristic best move (white).</li>
              <li>• First to connect five wins. You go first each round.</li>
              <li>• Use “Reset board” to start a fresh match.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GomokuAIGame
