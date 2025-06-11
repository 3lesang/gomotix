import ContentContainer from "@/components/ContentContainer";
import PassForm, { type PassFormValues } from "@/components/PassForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
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
import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { KeyIcon, SearchIcon, UserIcon } from "lucide-react";
import { useState } from "react";

type RoomType = {
  id: string;
  players: number;
  views: number;
  cost?: number;
  password?: boolean;
};

const rooms: RoomType[] = [
  {
    id: "room-1",
    players: 2,
    cost: 100,
    views: 10,
  },
  {
    id: "room-2",
    players: 3,
    views: 2000,
    cost: 1200,
    password: true,
  },
  {
    id: "room-3",
    players: 1,
    cost: 200,
    views: 500400,
    password: true,
  },
  { id: "room-2", players: 3, views: 200 },
  { id: "room-3", players: 1, views: 500 },
  { id: "room-4", players: 2, views: 1000, password: true },
  { id: "room-5", players: 4, views: 3000 },
  {
    id: "room-6",
    players: 2,
    views: 1500,
    password: true,
  },
  { id: "room-7", players: 3, views: 2500 },
  { id: "room-8", players: 2, views: 1200 },
  {
    id: "room-9",
    players: 1,
    views: 800,
    password: true,
  },
  { id: "room-10", players: 2, views: 600 },
];

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const client = useSuiClient();

  const { data } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address!,
      options: { showContent: true },
    },
    { enabled: !!account?.address }
  );

  console.log(data);

  const handleSubmit = (values: PassFormValues) => {
    setOpen(false);
    navigate({ to: "/room/$id", params: { id: "test" } });
    console.log("Password submitted:", values.password);
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-4">
          {rooms.map((room, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(room)}
              className="bg-gray-100 hover:bg-gray-50 hover:cursor-pointer transition-colors"
            >
              <CardHeader>
                <CardTitle className="line-clamp-1">#{room.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-200 text-xs text-green-800 w-fit rounded-md px-2 py-1">
                  Waiting
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center">
                  <Badge variant="secondary">
                    <p>{convertLargeNumberToString(room.players)}</p>
                    <UserIcon />
                  </Badge>
                  <Badge className="ml-2" variant="secondary">
                    <p>{convertLargeNumberToString(room?.cost || 0)}</p>
                    <Avatar className="rounded w-5 h-5">
                      <AvatarImage src="https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sui-coin.svg/public" />
                    </Avatar>
                  </Badge>
                  {room.password ? (
                    <Badge variant="secondary">
                      <KeyIcon className="h-3 w-3" />
                    </Badge>
                  ) : null}
                </div>
              </CardFooter>
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
