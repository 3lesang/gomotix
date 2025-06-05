import ContentContainer from "@/components/ContentContainer";
import NewGameForm from "@/components/NewGameForm";
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
      <div className="max-w-md mx-auto space-y-6">
        <NewGameForm />
        <p className="text-sm text-gray-500">
          Once you create a game, you can share the link with others to join.
        </p>
      </div>
    </ContentContainer>
  );
}
