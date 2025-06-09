import { cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";
import CustomPortal from "../CustomPortal";
import { Button } from "../ui/button";
import { useGame } from "./context/GameContext";

function WinnerPopup() {
  const { winner, setGameWinner } = useGame();

  if (!winner) return null;

  const handleClick = () => {
    setGameWinner(undefined);
  };

  return (
    <CustomPortal open>
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gray-50 rounded-xl w-96">
        <div
          className={cn(
            "font-extrabold text-9xl",
            winner == "x" ? "text-red-500" : "text-blue-500"
          )}
        >
          {winner === "x" ? (
            <XIcon className="w-24 h-24" />
          ) : (
            <CircleIcon className="w-24 h-24" />
          )}
        </div>
        <p className="text-2xl">Win!</p>
        <p className="text-lg">Congratulations!</p>
        <Button onClick={handleClick}>Continue</Button>
      </div>
    </CustomPortal>
  );
}

export default WinnerPopup;
