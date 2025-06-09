import ContentContainer from "@/components/ContentContainer";
import Game from "@/components/gomuku/Main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/room/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentContainer
      title="Room"
      description="Join or create a room to play Gomotix with friends or random players."
    >
      <Game />
    </ContentContainer>
  );
}
