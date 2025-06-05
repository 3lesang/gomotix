import React, { useCallback, useEffect, useState, type JSX } from "react";
import { Button } from "./components/ui/button";

// Type definitions
type CellValue = "" | "X" | "O";
type Board = CellValue[][];
type Player = "X" | "O";
type GameStatus = "playing" | "won" | "draw";

interface BoardConfig {
  size: number;
  winLength: number;
  name: string;
}

interface WinningCell {
  row: number;
  col: number;
}

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  gameOver: boolean;
  isDraw: boolean;
  status: GameStatus;
  winningCells: WinningCell[];
}

// Constants
const EMPTY: CellValue = "";
const X: Player = "X";
const O: Player = "O";

const BOARD_CONFIGS: BoardConfig[] = [
  { size: 3, winLength: 3, name: "3x3 Classic" },
  { size: 5, winLength: 4, name: "5x5 (4 in a row)" },
  { size: 7, winLength: 5, name: "7x7 (5 in a row)" },
  { size: 10, winLength: 5, name: "10x10 (5 in a row)" },
  { size: 20, winLength: 5, name: "15x15 Gomoku" },
];

const MultiCaroGame: React.FC = () => {
  // State management
  const [boardSize, setBoardSize] = useState<number>(20);
  const [winLength, setWinLength] = useState<number>(5);
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    currentPlayer: X,
    winner: null,
    gameOver: false,
    isDraw: false,
    status: "playing",
    winningCells: [],
  });

  // Helper function to initialize board
  const initializeBoard = useCallback((size: number): Board => {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(EMPTY));
  }, []);

  // Initialize board when size changes
  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      board: initializeBoard(boardSize),
    }));
  }, [boardSize, initializeBoard]);

  // Check for winner
  const checkWinner = useCallback(
    (
      board: Board,
      row: number,
      col: number,
      player: Player,
      winLen: number
    ): WinningCell[] | null => {
      const directions: [number, number][] = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal \
        [1, -1], // diagonal /
      ];

      for (const [dx, dy] of directions) {
        const winningCells: WinningCell[] = [{ row, col }];

        // Check in positive direction
        let r = row + dx;
        let c = col + dy;
        while (
          r >= 0 &&
          r < board.length &&
          c >= 0 &&
          c < board.length &&
          board[r][c] === player
        ) {
          winningCells.push({ row: r, col: c });
          r += dx;
          c += dy;
        }

        // Check in negative direction
        r = row - dx;
        c = col - dy;
        while (
          r >= 0 &&
          r < board.length &&
          c >= 0 &&
          c < board.length &&
          board[r][c] === player
        ) {
          winningCells.push({ row: r, col: c });
          r -= dx;
          c -= dy;
        }

        if (winningCells.length >= winLen) {
          return winningCells;
        }
      }

      return null;
    },
    []
  );

  // Check for draw
  const checkDraw = useCallback((board: Board): boolean => {
    return board.every((row) => row.every((cell) => cell !== EMPTY));
  }, []);

  // Handle cell click
  const handleCellClick = useCallback(
    (row: number, col: number): void => {
      if (gameState.gameOver || gameState.board[row][col] !== EMPTY) {
        return;
      }

      const newBoard: Board = gameState.board.map((r) => [...r]);
      newBoard[row][col] = gameState.currentPlayer;

      const winningCells = checkWinner(
        newBoard,
        row,
        col,
        gameState.currentPlayer,
        winLength
      );
      if (winningCells) {
        setGameState((prevState) => ({
          ...prevState,
          board: newBoard,
          winner: prevState.currentPlayer,
          gameOver: true,
          status: "won",
          winningCells: winningCells,
        }));
      } else if (checkDraw(newBoard)) {
        setGameState((prevState) => ({
          ...prevState,
          board: newBoard,
          isDraw: true,
          gameOver: true,
          status: "draw",
        }));
      } else {
        setGameState((prevState) => ({
          ...prevState,
          board: newBoard,
          currentPlayer: prevState.currentPlayer === X ? O : X,
        }));
      }
    },
    [
      gameState.board,
      gameState.currentPlayer,
      gameState.gameOver,
      checkWinner,
      checkDraw,
      winLength,
    ]
  );

  // Reset game
  const resetGame = (): void => {
    setGameState({
      board: initializeBoard(boardSize),
      currentPlayer: X,
      winner: null,
      gameOver: false,
      isDraw: false,
      status: "playing",
      winningCells: [],
    });
  };

  // Change board size
  const changeBoardSize = (newSize: number, newWinLength: number): void => {
    setBoardSize(newSize);
    setWinLength(newWinLength);
    setGameState({
      board: initializeBoard(newSize),
      currentPlayer: X,
      winner: null,
      gameOver: false,
      isDraw: false,
      status: "playing",
      winningCells: [],
    });
  };

  // Get cell size class based on board size
  const getCellSize = (): string => {
    if (boardSize <= 3) return "w-20 h-20 text-4xl";
    if (boardSize <= 5) return "w-16 h-16 text-3xl";
    if (boardSize <= 7) return "w-12 h-12 text-2xl";
    if (boardSize <= 10) return "w-10 h-10 text-xl";
    return "w-8 h-8 text-lg";
  };

  // Check if cell is part of winning line
  const isWinningCell = (row: number, col: number): boolean => {
    return gameState.winningCells.some(
      (cell) => cell.row === row && cell.col === col
    );
  };

  // Get cell CSS class
  const getCellClass = (value: CellValue, row: number, col: number): string => {
    const baseSize = getCellSize();
    const isWinner = isWinningCell(row, col);

    let baseClass = `${baseSize} border-b border-r border-gray-300 flex items-center justify-center font-bold cursor-pointer transition-all duration-200`;

    // Add winning cell highlighting
    if (isWinner) {
      baseClass += " border-none animate-pulse shadow-lg transform scale-110";
      if (value === X) {
        baseClass += " bg-red-200 text-red-700 border-red-400";
      } else {
        baseClass += " bg-blue-200 text-blue-700 border-blue-400";
      }
    } else {
      baseClass += " hover:bg-blue-50";
      if (value === X) {
        baseClass += " text-red-500 hover:text-red-600";
      } else if (value === O) {
        baseClass += " text-blue-500 hover:text-blue-600";
      } else {
        baseClass += " hover:bg-blue-100";
      }
    }

    return baseClass;
  };

  // Get grid CSS class
  const getGridClass = (): string => {
    return "grid border-t border-l border-gray-300";
  };

  // Get grid style
  const getGridStyle = (): React.CSSProperties => {
    return {
      gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
    };
  };

  // Render status message
  const renderStatusMessage = (): JSX.Element => {
    if (gameState.gameOver) {
      if (gameState.isDraw) {
        return <span className="text-yellow-500">It's a Draw! 🤝</span>;
      } else {
        return (
          <span
            className={
              gameState.winner === X ? "text-red-500" : "text-blue-500"
            }
          >
            {gameState.winner} Wins! 🎉
          </span>
        );
      }
    } else {
      return (
        <>
          Current Player:
          <span
            className={`ml-3 ${
              gameState.currentPlayer === X ? "text-red-500" : "text-blue-500"
            }`}
          >
            {gameState.currentPlayer}
          </span>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-4xl">
        {/* Board Size Selection */}
        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Choose Board Size:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {BOARD_CONFIGS.map((config: BoardConfig) => (
              <button
                key={config.size}
                onClick={() => changeBoardSize(config.size, config.winLength)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  boardSize === config.size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        </div> */}

        {/* Game Status */}
        {/* <div className="text-center">
          <div className="text-xl font-semibold text-gray-700">
            {renderStatusMessage()}
          </div>
        </div> */}

        {/* Game Board */}
        <div className="flex justify-center mb-6">
          <div className={getGridClass()} style={getGridStyle()}>
            {gameState.board.map((row: CellValue[], rowIndex: number) =>
              row.map((cell: CellValue, colIndex: number) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClass(cell, rowIndex, colIndex)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="text-center">
          <Button onClick={resetGame}>New Game</Button>
        </div>
      </div>
    </div>
  );
};

export default MultiCaroGame;
