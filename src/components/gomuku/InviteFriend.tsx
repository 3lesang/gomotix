import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

function InviteFriend() {
  const handleClick = () => {
    console.log("Invite friends clicked");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full font-extrabold" onClick={handleClick}>
          Invite Friends
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Friends to Join Your Game</DialogTitle>
          <DialogDescription>
            Share the game link with your friends to invite them to play Gomotix
            together. You can also invite random players to join your game.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <ul className="flex flex-col gap-4">
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <li
                  key={index}
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
                >
                  <p>0xf3...3433</p>
                  <div className="flex-1"></div>
                  <Button size="sm" variant="outline">
                    Invite
                  </Button>
                </li>
              );
            })}
          </ul>
        </ScrollArea>

        <div className="border-t h-1 relative my-4">
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 text-center text-gray-500">
            <span className="bg-white px-2">or</span>
          </div>
        </div>

        <Button className="w-full font-extrabold" onClick={handleClick}>
          Share Game Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default InviteFriend;
