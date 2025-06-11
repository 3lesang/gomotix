import Board from "@/components/gomuku/Board";
import { GameProvider, useGame } from "@/components/gomuku/context/GameContext";
import CountDown, { type CountDownHandle } from "@/components/gomuku/CountDown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import { CircleIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { Badge } from "../ui/badge";
import InviteFriend from "./InviteFriend";
import WinnerPopup from "./WinnerPopup";
import { cn } from "@/lib/utils";

function MainWrapper() {
  const timerRefO = useRef<CountDownHandle>(null);
  const timerRefX = useRef<CountDownHandle>(null);
  const { currentPlayer, setStatus, clear, status, setGameWinner } = useGame();

  const handleRestart = () => {
    timerRefO.current?.restart();
    timerRefX.current?.restart();
  };

  const handleClick = () => {
    clear?.();
    handleRestart();
    setStatus?.("playing");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8">
          <div className="flex w-full">
            <div className="flex gap-2">
              <Avatar className="rounded-md">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold">0xfc...4320</p>
                  <Badge className="ml-2">100$</Badge>
                </div>
                <p className="text-xs text-gray-500">Player</p>
              </div>
              <CircleIcon className="text-blue-500 w-5 h-5" />
            </div>
            <div className="flex-1" />
            <CountDown
              count={10}
              ref={timerRefO}
              pause={currentPlayer == "x" || status !== "playing"}
              onCountEnd={() => {
                if (status === "playing") {
                  setStatus?.("finished");
                  setGameWinner("x");
                }
              }}
            />
          </div>

          <div className="h-4" />
          <Board />
          <div className="h-4" />

          <div className="flex w-full">
            <div className="flex gap-2">
              <Avatar className="rounded-md">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold">0xfe...5520</p>
                  <Badge className="ml-2">100$</Badge>
                </div>
                <p className="text-xs text-gray-500">Host</p>
              </div>
              🇻🇳
              <XIcon className="text-red-500" />
            </div>
            <div className="flex-1" />
            <CountDown
              count={10}
              ref={timerRefX}
              pause={currentPlayer == "o" || status !== "playing"}
              onCountEnd={() => {
                if (status === "playing") {
                  setStatus?.("finished");
                  setGameWinner("o");
                }
              }}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="mb-4">
            <div className={cn(buttonVariants({ variant: "secondary" }))}>
              <p className="font-extrabold">200</p>
              <Avatar className="rounded w-5 h-5">
                <AvatarImage src="https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sui-coin.svg/public" />
              </Avatar>
            </div>
          </div>

          <div className="mt-4"></div>
          <InviteFriend />
          <div className="mt-4"></div>
          <Button
            className="w-full font-extrabold bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleClick}
          >
            Start Game
          </Button>
        </div>
      </div>
      <WinnerPopup />
    </div>
  );
}

function Main() {
  return (
    <GameProvider>
      <MainWrapper />
    </GameProvider>
  );
}

export default Main;
