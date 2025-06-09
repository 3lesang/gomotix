import ContentContainer from "@/components/ContentContainer";
import PassForm, { type PassFormValues } from "@/components/PassForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { convertLargeNumberToString } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DollarSignIcon, EyeIcon, KeyIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

type RoomType = {
  id: string;
  title: string;
  players: number;
  views: number;
  cost?: number;
  password?: boolean;
};

const rooms: RoomType[] = [
  {
    id: "room-1",
    title: "Malachi Glenn",
    players: 2,
    cost: 100,
    views: 10,
  },
  {
    id: "room-2",
    title: "Neve Haley",
    players: 3,
    views: 2000,
    cost: 1200,
    password: true,
  },
  {
    id: "room-3",
    title: "Melvin Wiley",
    players: 1,
    cost: 200,
    views: 500400,
    password: true,
  },
  { id: "room-2", title: "Neve Haley", players: 3, views: 200 },
  { id: "room-3", title: "Melvin Wiley", players: 1, views: 500 },
  { id: "room-4", title: "John Doe", players: 2, views: 1000, password: true },
  { id: "room-5", title: "Jane Smith", players: 4, views: 3000 },
  {
    id: "room-6",
    title: "Alice Johnson",
    players: 2,
    views: 1500,
    password: true,
  },
  { id: "room-7", title: "Bob Brown", players: 3, views: 2500 },
  { id: "room-8", title: "Charlie Davis", players: 2, views: 1200 },
  {
    id: "room-9",
    title: "Diana Prince",
    players: 1,
    views: 800,
    password: true,
  },
  { id: "room-10", title: "Ethan Hunt", players: 2, views: 600 },
  { id: "room-11", title: "Fiona Gallagher", players: 3, views: 900 },
];

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values: PassFormValues) => {
    setOpen(false);
    navigate({ to: "/room/$id", params: { id: "test" } });
  };

  const handleCardClick = (room: RoomType) => {
    if (room.password) {
      setOpen(true);
      return;
    } else {
      navigate({ to: "/room/$id", params: { id: room.id } });
    }
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-4">
          {rooms.map((room, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(room)}
              className="bg-gray-100 hover:bg-gray-50 hover:cursor-pointer transition-colors"
            >
              <CardHeader>
                <CardTitle className="line-clamp-1">{room.title}</CardTitle>
                {room.password ? (
                  <CardAction>
                    <KeyIcon className="h-3 w-3" />
                  </CardAction>
                ) : null}
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Badge className="bg-yellow-600">
                    <p>{convertLargeNumberToString(room?.cost || 0)}</p>
                    <DollarSignIcon />
                  </Badge>
                  <Badge variant="secondary">
                    <p>{convertLargeNumberToString(room.views)}</p>
                    <EyeIcon />
                  </Badge>
                </div>
              </CardContent>
            </Card>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>Enter Your Password?</DialogTitle>
            <DialogDescription>
              Please enter the password to join this room. If you don't have a
              password, please contact the room owner.
            </DialogDescription>
          </DialogHeader>
          <PassForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </ContentContainer>
  );
}
