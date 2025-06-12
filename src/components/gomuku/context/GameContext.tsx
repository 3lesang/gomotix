import { createContext, useContext, useState, type ReactNode } from "react";

export type Player = "x" | "o";

type GameContextType = {
  status?: "waiting" | "playing" | "finished";
  setStatus?: (status: "waiting" | "playing" | "finished") => void;
  clickedPositions: Map<string, Player>;
  updateWinPositions: (positions: Set<string>) => void;
  winPosition: Set<string>;
  clear?: () => void;
  winner?: string;
  currentPlayer: Player;
  changePlayer: () => void;
  updateClickedPositions: ({
    key,
    symbol,
  }: {
    key: string;
    symbol: string;
  }) => void;
  setGameWinner: (player?: Player) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<"waiting" | "playing" | "finished">(
    "waiting"
  );
  const [clickedPositions, setClickedPositions] = useState(new Map());
  const [winPosition, setWinPosition] = useState<Set<string>>(new Set());

  const [winner, setWinner] = useState<Player | undefined>(undefined);

  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");

  const changePlayer = () => {
    setCurrentPlayer((player) => {
      return player == "x" ? "o" : "x";
    });
  };

  const updateClickedPositions = ({
    key,
    symbol,
  }: {
    key: string;
    symbol: string;
  }) => {
    const newMap = new Map(clickedPositions);
    if (!newMap.has(key)) {
      newMap.set(key, symbol);
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
        status,
        setStatus,
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
