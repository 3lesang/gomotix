import MultiCaroGame from "@/MultiCaroGame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MultiCaroGame />
    </div>
  );
}
