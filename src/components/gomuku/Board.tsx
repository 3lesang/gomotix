import { useGame } from "@/components/gomuku/context/GameContext";
import { cn } from "@/lib/utils";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { CircleIcon, XIcon } from "lucide-react";
import Peer, { DataConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

const length = 15;
const GUEST_ADDRESS =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

function Board() {
  const {
    clickedPositions,
    winPosition,
    updateClickedPositions,
    id,
    room,
    symbol,
  } = useGame();
  const account = useCurrentAccount();
  const [turn, setTurn] = useState<"x" | "o">("o");
  const peerRef = useRef<Peer | null>(null);
  const connRef = useRef<DataConnection | null>(null);

  const host = room?.content?.fields?.host;
  const player = room?.content?.fields?.player;

  const isHost = account?.address === host;
  const isGuest = player === GUEST_ADDRESS;

  const handleClick = (row: number, col: number) => {
    const key = `${row},${col}`;
    updateClickedPositions(key, turn);
    if (connRef.current) {
      connRef.current.send({ key, symbol: turn });
      setTurn(symbol === "x" ? "o" : "x");
    }
  };

  const renderPlayer = (row: number, col: number) => {
    const key = `${row},${col}`;
    const player = clickedPositions.get(key);
    const isWin = winPosition.has(key);

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

  const isClicked = (row: number, col: number) => {
    const key = `${row},${col}`;
    return clickedPositions.has(key);
  };

  useEffect(() => {
    if (isHost && account?.address && host && id) {
      const p = new Peer(id);
      peerRef.current = p;
      p.on("open", () => {
        console.log("Waiting for guest to connect...");
        p.on("connection", (conn) => {
          console.log("Guest connected!");
          connRef.current = conn;
          conn.on("data", (data: any) => {
            const { key, symbol } = data;
            updateClickedPositions(key, symbol);
            const turn = symbol === "x" ? "o" : "x";
            setTurn(turn);
          });
        });
      });
    }
  }, [id, host]);

  useEffect(() => {
    if (!account && isGuest && host && id) {
      const p = new Peer();
      peerRef.current = p;
      p.on("open", () => {
        console.log("Connecting to host...");
        const conn = p.connect(id);
        connRef.current = conn;
        console.log("Host connected!");
        conn.on("data", (data: any) => {
          const { key, symbol } = data;
          updateClickedPositions(key, symbol);
          const turn = data.symbol === "x" ? "o" : "x";
          setTurn(turn);
        });
      });
    }
  }, [id, host, player]);

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
                  disabled={turn != symbol || isClicked(row, col)}
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
