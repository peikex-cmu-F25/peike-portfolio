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
          setMessage('You win with five in a row.')
        } else {
          setCurrentPlayer('w')
          setMessage('The agent is choosing a move.')
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
          setMessage('The agent has no moves left. You win.')
          return prev
        }
        const { row, col } = bestMove
        const next = cloneBoard(prev)
        next[row][col] = 'w'
        if (checkWinner(next, row, col, 'w')) {
          setWinner('w')
          setMessage('The agent connected five.')
        } else {
          setCurrentPlayer('b')
          setMessage('The agent placed a white stone.')
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
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Gomoku</h3>
          <p className="text-sm text-slate-600 dark:text-gray-300">
            You play black and the agent plays white. It doesn't search ahead: for each empty cell near the stones, it
            scores how long a line the move would extend for itself and how long a line of yours it would block.
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
          <div className="rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-neutral-800 dark:bg-neutral-900">
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
                          cell === 'b' ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-white border border-slate-400 dark:bg-neutral-500 dark:border-neutral-400'
                        }`}
                      />
                    )
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handlePlayerMove(r, c)}
                      className={`relative flex h-8 w-8 items-center justify-center rounded-md border border-amber-200 bg-amber-100 transition-colors duration-150 dark:border-neutral-700 dark:bg-neutral-800 ${
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
          <p className="text-xs text-slate-500 dark:text-gray-400">
            Tip: the agent doesn't search ahead, so a move that creates two threats at once is hard for it to stop.
          </p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-gray-300">
              Turn & status
            </h4>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {winner
                ? winner === 'b'
                  ? 'You win'
                  : 'The agent wins'
                : currentPlayer === 'b'
                  ? 'Your move'
                  : 'Agent’s turn'}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-300">{message}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-gray-300">
              How the agent scores a move
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-gray-300">
              <li>
                <span className="font-medium text-slate-900 dark:text-white">Its own lines:</span> in each of the four
                directions, longer runs score much more (2, 50, 400, 4,000 points, and a large bonus for five).
              </li>
              <li>
                <span className="font-medium text-slate-900 dark:text-white">Your lines:</span> blocking one of your runs
                scores about half as much as extending its own run of the same length.
              </li>
              <li>
                <span className="font-medium text-slate-900 dark:text-white">Search:</span> it only considers empty cells in the
                area the stones cover, plus two cells on each side, and picks the highest-scoring one. It does not consider your reply.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-gray-300">
              How to play
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-gray-300">
              <li>• Click an empty cell to place a black stone.</li>
              <li>• The agent answers with white.</li>
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