import type { RoomObject } from "@/types";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useParams } from "@tanstack/react-router";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Symbol = "x" | "o";

const SYMBOL = {
  1: "x" as "x",
  2: "o" as "o",
};

type GameContextType = {
  id?: string;
  status?: "waiting" | "playing" | "finished";
  setStatus?: (status: "waiting" | "playing" | "finished") => void;
  clickedPositions: Map<string, Symbol>;
  updateWinPositions: (positions: Set<string>) => void;
  winPosition: Set<string>;
  clear?: () => void;
  winner?: string;
  currentPlayer: Symbol;
  changePlayer: () => void;
  updateClickedPositions: (key: string, symbol: string) => void;
  setGameWinner: (player?: Symbol) => void;
  room?: RoomObject;
  isHost: boolean;
  isPlayer: boolean;
  symbol: "x" | "o";
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams({ from: "/room/$id" });
  const account = useCurrentAccount();
  const { data } = useSuiClientQuery(
    "getObject",
    {
      id,
      options: { showContent: true },
    },
    {
      select(data) {
        return data?.data as RoomObject;
      },
    }
  );

  const [status, setStatus] = useState<"waiting" | "playing" | "finished">(
    "waiting"
  );
  const [clickedPositions, setClickedPositions] = useState(new Map());
  const [winPosition, setWinPosition] = useState<Set<string>>(new Set());

  const [winner, setWinner] = useState<Symbol | undefined>(undefined);

  const [currentPlayer, setCurrentPlayer] = useState<Symbol>("x");

  const changePlayer = () => {
    setCurrentPlayer((player) => {
      return player == "x" ? "o" : "x";
    });
  };

  const isHost = account?.address == data?.content?.fields?.host;
  const isPlayer = account?.address == data?.content?.fields?.player;

  const updateClickedPositions = (key: string, symbol: string) => {
    setClickedPositions((prev) => {
      if (!prev.has(key)) {
        const newMap = new Map(prev);
        newMap.set(key, symbol);
        return newMap;
      }
      return prev;
    });
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

  const setGameWinner = (player?: Symbol) => {
    setWinner(player);
  };

  const getSymbol = (): Symbol => {
    const hostSymbol = SYMBOL[data?.content?.fields?.host_symbol!];
    if (isHost) return hostSymbol;
    return hostSymbol == "o" ? "x" : "o";
  };

  return (
    <GameContext.Provider
      value={{
        id: data?.objectId,
        symbol: getSymbol(),
        isHost,
        isPlayer,
        room: data,
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
