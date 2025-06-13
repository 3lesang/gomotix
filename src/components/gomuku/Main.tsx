import Board from "@/components/gomuku/Board";
import { GameProvider, useGame } from "@/components/gomuku/context/GameContext";
import { type CountDownHandle } from "@/components/gomuku/CountDown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import InviteFriend from "./InviteFriend";
import Player from "./Player";
import WinnerPopup from "./WinnerPopup";

function MainWrapper() {
  const timerRefO = useRef<CountDownHandle>(null);
  const timerRefX = useRef<CountDownHandle>(null);
  const { setStatus, clear, room } = useGame();

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
          <Player
            address={room?.content?.fields?.player}
            type="Player"
            symbol={room?.content?.fields?.host_symbol == 1 ? 2 : 1}
          />
          <div className="h-4" />
          <Board />
          <div className="h-4" />
          <Player
            address={room?.content?.fields?.host}
            type="Host"
            symbol={room?.content?.fields?.host_symbol}
          />
        </div>
        <div className="col-span-4">
          <div className="mb-4">
            <div className={cn(buttonVariants({ variant: "secondary" }))}>
              <p className="font-extrabold">
                {room?.content?.fields?.stake &&
                  room?.content?.fields?.stake! / 1_000_000_000}
              </p>
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
