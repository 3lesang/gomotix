import ContentContainer from "@/components/ContentContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/swap/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentContainer
      title="Swap"
      description="Swap your cards with others to create the best hand possible."
    ></ContentContainer>
  );
}
