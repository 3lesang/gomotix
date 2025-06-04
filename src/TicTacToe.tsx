import React, { useState } from "react";

type Player = "X" | "O" | null;

interface TicTacToeProps {
  size: number;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ size }) => {
  const totalCells = size * size;
  const [board, setBoard] = useState<Player[]>(Array(totalCells).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player>(null);

  const checkWinner = (newBoard: Player[]) => {
    const lines: number[][] = [];

    // Rows
    for (let r = 0; r < size; r++) {
      lines.push([...Array(size)].map((_, i) => r * size + i));
    }

    // Columns
    for (let c = 0; c < size; c++) {
      lines.push([...Array(size)].map((_, i) => i * size + c));
    }

    // Diagonal TL ↘ BR
    lines.push([...Array(size)].map((_, i) => i * size + i));

    // Diagonal TR ↙ BL
    lines.push([...Array(size)].map((_, i) => i * size + (size - 1 - i)));

    for (const line of lines) {
      const first = newBoard[line[0]];
      if (first && line.every(index => newBoard[index] === first)) {
        return first;
      }
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    const win = checkWinner(newBoard);

    setBoard(newBoard);
    setWinner(win);
    if (!win) setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(totalCells).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <h2 className="text-2xl font-bold">Tic Tac Toe {size}x{size}</h2>

      <div
        className={`grid gap-2`}
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 3rem))` }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-12 h-12 bg-white text-xl font-bold border rounded shadow hover:bg-gray-100"
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="text-lg">
        {winner ? (
          <p className="text-green-600 font-semibold">🎉 Player {winner} wins!</p>
        ) : board.every(Boolean) ? (
          <p className="text-gray-500">It's a draw!</p>
        ) : (
          <p>Current Player: <span className="font-bold">{currentPlayer}</span></p>
        )}
      </div>

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Restart
      </button>
    </div>
  );
};

export default TicTacToe;
