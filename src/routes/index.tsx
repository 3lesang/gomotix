import ContentContainer from "@/components/ContentContainer";
import PassForm, { type PassFormValues } from "@/components/PassForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EyeIcon, KeyIcon, SearchIcon, UserCircleIcon } from "lucide-react";
import { useState } from "react";

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

  const handleCardClick = (index: number) => {
    if (index % 2 === 0) {
      setOpen(true);
      return;
    } else {
      navigate({ to: "/room/$id", params: { id: `room-${index}` } });
    }
  };

  return (
    <ContentContainer
      title="Welcome to Gomoku.io"
      description="Browse through the latest games played by our community. Click on a card to view details or join a game."
    >
      <div className="max-w-4xl mx-auto">
        <div className="">
          <Button variant="outline" size="icon">
            <SearchIcon />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-4">
          {Array.from({ length: 25 }).map((_, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(index)}
              className="hover:bg-gray-50 hover:cursor-pointer transition-colors shadow-none border-none"
            >
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                {index % 2 === 0 ? (
                  <CardAction>
                    <KeyIcon className="h-3 w-3" />
                  </CardAction>
                ) : null}
              </CardHeader>
              <CardFooter>
                <div className="flex items-center justify-between gap-2">
                  <Badge>
                    <UserCircleIcon />2
                  </Badge>

                  <Badge variant="secondary">
                    {index + 1}
                    <EyeIcon />
                  </Badge>
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
