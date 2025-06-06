import { useGame, type Player } from "@/context/GameContext";
import { checkWinnerMap, cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";
import { useState } from "react";

const length = 15;

function Board() {
  const [clickedPositions, setClickedPositions] = useState(new Map());
  const [winPosition, setWinPosition] = useState<[number, number][]>([]);
  const [winner, setWinner] = useState<string>();
  const { currentPlayer, changePlayer } = useGame();

  const handleClick = (row: number, col: number) => {
    const key = `${row},${col}`;

    const newMap = new Map(clickedPositions);
    if (newMap.has(key) || winner) return;

    newMap.set(key, currentPlayer);

    const result = checkWinnerMap(newMap, row, col, currentPlayer);

    if (result?.winner) {
      setWinner(result.winner);
      setWinPosition(result.line);
    }

    setClickedPositions(newMap);

    if (!result?.winner) {
      changePlayer();
    }
  };

  const isClicked = (row: number, col: number) => {
    return clickedPositions.has(`${row},${col}`);
  };

  const getPlayer = (row: number, col: number): Player => {
    return clickedPositions.get(`${row},${col}`);
  };

  function isPositionInWinLine(row: number, col: number): boolean {
    return winPosition.some(([r, c]) => r === row && c === col);
  }

  const renderPlayer = (row: number, col: number) => {
    const player = getPlayer(row, col);
    const isWin = isPositionInWinLine(row, col);
    
    if (player === "x") {
      return (
        <XIcon 
          className={cn(
            "w-5 h-5",
            isWin ? "text-red-700" : "text-red-500"
          )} 
        />
      );
    }
    if (player === "o") {
      return (
        <CircleIcon 
          className={cn(
            "w-5 h-5",
            isWin ? "text-blue-700" : "text-blue-500"
          )} 
        />
      );
    }
  };

  return (
    <table className="border-collapse border rounded-2xl overflow-hidden">
      <tbody>
        {Array.from({ length }).map((_, row) => (
          <tr key={row}>
            {Array.from({ length }).map((_, col) => {
              const isWin = isPositionInWinLine(row, col);
              return (
                <td
                  key={col}
                  className="w-10 h-10 border border-blue-200/90 text-center align-middle"
                >
                  <button
                    className={cn(
                      "hover:bg-gray-50 w-full h-full flex items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-50",
                      isWin ? "bg-blue-500 text-white font-bold" : "bg-inherit"
                    )}
                    disabled={isClicked(row, col)}
                    onClick={() => handleClick(row, col)}
                  >
                    {renderPlayer(row, col)}
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;