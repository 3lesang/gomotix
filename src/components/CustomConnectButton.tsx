import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useSuiClientQuery,
  useWallets,
} from "@mysten/dapp-kit";
import {
  ChevronDown,
  LogOutIcon,
  SettingsIcon,
  Wallet2Icon,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const formatBalance = (balance: string) => {
  return (Number(balance) / 1_000_000_000).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

function CustomConnectButton() {
  const wallets = useWallets();
  const account = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  const { data } = useSuiClientQuery(
    "getBalance",
    { owner: account?.address || "" },
    { enabled: !!account?.address }
  );

  if (account && account.address) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            <Wallet2Icon />
            <Avatar className="rounded w-5 h-5">
              <AvatarImage src="https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sui-coin.svg/public" />
            </Avatar>
            {data && (
              <p className="font-extrabold">
                {formatBalance(data.totalBalance)}
              </p>
            )}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-1">
          <Button className="w-full" variant="ghost">
            <SettingsIcon />
            Setting
          </Button>
          <div className="h-1 border-t my-1" />
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:no-underline hover:text-red-500"
            onClick={() => disconnect()}
          >
            <LogOutIcon />
            Disconnect
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Welcome to the next generation of on-chain game, powered by Sui
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-2">
          {wallets.map((wallet) => (
            <li key={wallet.name}>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  connect(
                    { wallet },
                    {
                      onSuccess: () => console.log("connected"),
                    }
                  );
                }}
              >
                <Avatar className="rounded w-6 h-6 mr-2">
                  <AvatarImage src={wallet.icon} />
                </Avatar>
                <p className="font-semibold">{wallet.name}</p>
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default CustomConnectButton;
