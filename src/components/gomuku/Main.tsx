import Board from "@/components/gomuku/Board";
import { GameProvider, useGame } from "@/components/gomuku/context/GameContext";
import CountDown, { type CountDownHandle } from "@/components/gomuku/CountDown";
import NewGameForm from "@/components/NewGameForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CircleIcon, XIcon } from "lucide-react";
import { useRef } from "react";

function MainWrapper() {
  const timerRefO = useRef<CountDownHandle>(null);
  const timerRefX = useRef<CountDownHandle>(null);
  const { currentPlayer, winner, clear } = useGame();

  const handleRestart = () => {
    timerRefO.current?.restart();
    timerRefX.current?.restart();
  };

  const handleClick = () => {
    clear?.();
    handleRestart();
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
              <p className="font-semibold">New User</p>
              <CircleIcon className="text-blue-500 w-5 h-5" />
            </div>
            <div className="flex-1" />
            <CountDown
              count={10}
              ref={timerRefO}
              pause={currentPlayer == "x" || Boolean(winner)}
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
              <p className="font-semibold">Sang Le</p>
              🇻🇳
              <XIcon className="text-red-500" />
            </div>
            <div className="flex-1" />
            <CountDown
              count={10}
              ref={timerRefX}
              pause={currentPlayer == "o" || Boolean(winner)}
            />
          </div>
        </div>
        <div className="col-span-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full font-extrabold bg-blue-500 hover:bg-blue-600 transition-colors">
                New Game
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Game?</DialogTitle>
                <DialogDescription>Setting room</DialogDescription>
              </DialogHeader>
              <NewGameForm />
            </DialogContent>
          </Dialog>
          <div className="mt-4"></div>
          <Button className="w-full font-extrabold" onClick={handleClick}>
            Restart
          </Button>
        </div>
      </div>
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
