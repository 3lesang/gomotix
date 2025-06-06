import { createContext, useContext, useState, type ReactNode } from "react";

export type Player = "x" | "o";

type GameContextType = {
  currentPlayer: Player;
  changePlayer: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");

  const changePlayer = () => {
    setCurrentPlayer((player) => {
      return player == "x" ? "o" : "x";
    });
  };

  return (
    <GameContext.Provider value={{ currentPlayer, changePlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
