import ContentContainer from "@/components/ContentContainer";
import RoomItem from "@/components/RoomItem";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PACKAGE_ID } from "@/const";
import type { RoomObject } from "@/types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: ids } = useSuiClientQuery(
    "queryTransactionBlocks",
    {
      filter: {
        MoveFunction: {
          package: PACKAGE_ID,
          module: "gomotix",
          function: "create_room",
        },
      },
      options: {
        showObjectChanges: true,
      },
      limit: 20,
      order: "descending",
    },
    {
      select(data) {
        return data.data
          .flatMap(
            (tx) =>
              tx.objectChanges?.filter((change) => change.type === "created") ??
              []
          )
          .map((change) => change?.objectId);
      },
    }
  );

  const { data } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: ids!,
      options: {
        showContent: true,
      },
    },
    {
      select(data) {
        return data.map((value) => value?.data) as RoomObject[];
      },
    }
  );

  return (
    <ContentContainer
      title="Welcome to Gomotix.io"
      description="Browse through the latest games played by our community. Click on a card to view details or join a game."
    >
      <div className="max-w-4xl mx-auto">
        <div className="">
          <Button variant="outline" size="icon">
            <SearchIcon />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-4">
          {data?.map((room, index) => (
            <RoomItem
              key={index}
              id={room?.objectId}
              stake={room?.content?.fields?.stake!}
              host={room?.content?.fields?.host}
              player={room?.content?.fields?.player}
            />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </ContentContainer>
  );
}
