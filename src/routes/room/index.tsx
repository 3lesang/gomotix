import ContentContainer from "@/components/ContentContainer";
import NewGameForm from "@/components/NewGameForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/room/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentContainer
      title="New Game"
      description="Create a new Gomotix game to play with friends or random players."
    >
      <div className="flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-extrabold bg-blue-500 hover:bg-blue-600 transition-colors">
              New Game
            </Button>
          </DialogTrigger>
          <DialogContent className="w-96">
            <DialogHeader>
              <DialogTitle>Create a New Gomotix Game</DialogTitle>
              <DialogDescription>
                Set up your game preferences and invite friends to join you in a
                Gomotix match!
              </DialogDescription>
            </DialogHeader>
            <NewGameForm />
          </DialogContent>
        </Dialog>
      </div>
    </ContentContainer>
  );
}
