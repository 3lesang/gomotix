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
  useWallets,
} from "@mysten/dapp-kit";
import { ChevronDown, LogOutIcon, SettingsIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

function CustomConnectButton() {
  const wallets = useWallets();
  const account = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  if (account && account.address) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            {account.address.slice(0, 4)}...
            {account.address.slice(-4)}
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
            variant="link"
            className="w-full text-red-500 hover:no-underline"
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
