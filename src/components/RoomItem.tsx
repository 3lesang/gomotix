import JoinGameForm, {
  type JoinGameFormValues,
} from "@/components/JoinGameForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { convertLargeNumberToString } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { CopyIcon, UserIcon } from "lucide-react";
import { useState } from "react";

interface RoomItemProps {
  id: string;
  stake: number;
}

function RoomItem({ id, stake }: RoomItemProps) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleSubmit = (values: JoinGameFormValues) => {
    navigate({ to: "/room/$id", params: { id } });
    console.log("Password submitted:", values.password);
  };

  const handleCardClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="bg-gray-100 hover:bg-gray-50 hover:cursor-pointer transition-colors group"
      >
        <CardHeader>
          <CardTitle className="flex">
            {id.slice(0, 6)}...{id.slice(-6)}
            <Badge
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CopyIcon className="" />
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-200 text-xs text-green-800 w-fit rounded-md px-2 py-1">
            Waiting
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center">
            <Badge variant="secondary">
              <p>{convertLargeNumberToString(2)}</p>
              <UserIcon />
            </Badge>
            <Badge className="ml-2" variant="secondary">
              <p>{convertLargeNumberToString(stake! / 1_000_000_000)}</p>
              <Avatar className="rounded w-5 h-5">
                <AvatarImage src="https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sui-coin.svg/public" />
              </Avatar>
            </Badge>
            {/* {room.password ? (
                    <Badge variant="secondary">
                      <KeyIcon className="h-3 w-3" />
                    </Badge>
                  ) : null} */}
          </div>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Enter Your Password?</DialogTitle>
            <DialogDescription>
              Please enter the password to join this room. If you don't have a
              password, please contact the room owner.
            </DialogDescription>
          </DialogHeader>
          <JoinGameForm
            onSubmit={handleSubmit}
            defaultValues={{ stake: stake / 1_000_000_000 }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoomItem;
