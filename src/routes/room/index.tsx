import ContentContainer from "@/components/ContentContainer";
import Game from "@/components/gomuku/Main";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/room/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentContainer
      title="New Game"
      description="Create a new Gomoku game to play with friends or random players."
    >
      <Game />
    </ContentContainer>
  );
}
