import { useGame, type Player } from "@/context/GameContext";
import { checkWinnerMap, cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";

const length = 15;

function Board() {
  const {
    clickedPositions,
    updateClickedPositions,
    updateWinPositions,
    winPosition,
    setGameWinner,
    currentPlayer,
    changePlayer,
    winner,
  } = useGame();

  const handleClick = (row: number, col: number) => {
    if (winner) return;
    updateClickedPositions(row, col);
    const result = checkWinnerMap(clickedPositions, row, col, currentPlayer);
    changePlayer();
    if (!result) return;
    updateWinPositions(result.line);
    setGameWinner(result.winner as Player);
  };

  const isClicked = (row: number, col: number) => {
    return clickedPositions.has(`${row},${col}`);
  };

  const getPlayer = (row: number, col: number): Player | undefined => {
    return clickedPositions.get(`${row},${col}`);
  };

  function isPositionInWinLine(row: number, col: number): boolean {
    return winPosition.has(`${row},${col}`);
  }

  const renderPlayer = (row: number, col: number) => {
    const player = getPlayer(row, col);
    const isWin = isPositionInWinLine(row, col);

    if (player === "x") {
      return (
        <XIcon
          className={cn("w-5 h-5", isWin ? "text-red-700" : "text-red-500")}
        />
      );
    }
    if (player === "o") {
      return (
        <CircleIcon
          className={cn("w-5 h-5", isWin ? "text-blue-700" : "text-blue-500")}
        />
      );
    }
  };

  return (
    <table className="border-collapse border rounded-2xl overflow-hidden">
      <tbody>
        {Array.from({ length }).map((_, row) => (
          <tr key={row}>
            {Array.from({ length }).map((_, col) => (
              <td
                key={col}
                className="w-10 h-10 border border-blue-200/50 text-center align-middle"
              >
                <button
                  className={cn(
                    "hover:bg-blue-50 disabled:hover:bg-transparent w-full h-full flex items-center justify-center"
                  )}
                  disabled={isClicked(row, col) || !!winner}
                  onClick={() => handleClick(row, col)}
                >
                  {renderPlayer(row, col)}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
