import ContentContainer from "@/components/ContentContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentContainer
      title="Leaderboard"
      description="List top players and their scores in Gomotix."
    ></ContentContainer>
  );
}
