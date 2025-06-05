import ContentContainer from "@/components/ContentContainer";
import NewGameForm from "@/components/NewGameForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
      <Card className="max-w-md shadow-none border-none mx-auto bg-transparent">
        <CardContent>
          <NewGameForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Once you create a game, you can share the link with others to join.
          </p>
        </CardFooter>
      </Card>
    </ContentContainer>
  );
}
