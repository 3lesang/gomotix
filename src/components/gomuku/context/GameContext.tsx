import { createContext, useContext, useState, type ReactNode } from "react";

export type Player = "x" | "o";

type GameContextType = {
  clickedPositions: Map<string, Player>;
  updateWinPositions: (positions: Set<string>) => void;
  winPosition: Set<string>;
  clear?: () => void;
  winner?: string;
  currentPlayer: Player;
  changePlayer: () => void;
  updateClickedPositions: (row: number, col: number) => void;
  setGameWinner: (player?: Player) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [clickedPositions, setClickedPositions] = useState(new Map());
  const [winPosition, setWinPosition] = useState<Set<string>>(new Set());

  const [winner, setWinner] = useState<Player | undefined>(undefined);

  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");

  const changePlayer = () => {
    setCurrentPlayer((player) => {
      return player == "x" ? "o" : "x";
    });
  };

  const updateClickedPositions = (row: number, col: number) => {
    const key = `${row},${col}`;
    const newMap = new Map(clickedPositions);
    if (!newMap.has(key)) {
      newMap.set(key, currentPlayer);
      setClickedPositions(newMap);
    }
  };

  const updateWinPositions = (positions: Set<string>) => {
    setWinPosition(positions);
  };

  const clear = () => {
    setClickedPositions(new Map());
    setWinPosition(new Set());
    setWinner(undefined);
    setCurrentPlayer("x");
  };

  const setGameWinner = (player?: Player) => {
    setWinner(player);
  };

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        changePlayer,
        clickedPositions,
        clear,
        winner,
        updateClickedPositions,
        updateWinPositions,
        winPosition,
        setGameWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
