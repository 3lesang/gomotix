import CountDown from "@/components/gomuku/CountDown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { formatBalance } from "@/lib/utils";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { CircleIcon, XIcon } from "lucide-react";

interface PlayerProps {
  address?: string;
  symbol?: 1 | 2;
  type?: "Player" | "Host";
}

const icon = {
  1: <XIcon className="text-red-500 w-5 h-5" />,
  2: <CircleIcon className="text-blue-500 w-5 h-5" />,
};

function Player({ address, type, symbol }: PlayerProps) {
  const account = useCurrentAccount();
  const { data } = useSuiClientQuery(
    "getBalance",
    { owner: address! },
    { enabled: !!address }
  );

  const renderAddress = () => {
    if (
      address ===
        "0x0000000000000000000000000000000000000000000000000000000000000000" ||
      !address
    ) {
      return "...";
    }
    return `${address?.slice(0, 4)}...${address?.slice(-4)}`;
  };

  const renderLabel = () => {
    if (address === account?.address) {
      return "You";
    }
    return type;
  };

  return (
    <div className="flex w-full">
      <div className="flex gap-2">
        <Avatar className="rounded-md">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold">{renderAddress()}</p>
            <Badge className="ml-2" variant="secondary">
              {data && (
                <p className="font-extrabold">
                  {formatBalance(data.totalBalance)}
                </p>
              )}
              <Avatar className="rounded w-4 h-4">
                <AvatarImage src="https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sui-coin.svg/public" />
              </Avatar>
            </Badge>
            {icon[symbol!]}
          </div>
          <p className="text-xs text-gray-500">{renderLabel()}</p>
        </div>
      </div>
      <div className="flex-1" />
      <CountDown count={10} pause />
    </div>
  );
}

export default Player;
