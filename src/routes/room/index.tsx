import ContentContainer from "@/components/ContentContainer";
import NewGameForm, { type NewGameFormValues } from "@/components/NewGameForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PACKAGE_ID } from "@/const";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/room/")({
  component: RouteComponent,
});

function RouteComponent() {
  const client = useSuiClient();

  const account = useCurrentAccount();

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleSubmit = async (values: NewGameFormValues) => {
    const { stake } = values;
    if (!account) {
      return;
    }
    const { data: coins } = await client.getCoins({
      owner: account.address,
      coinType: "0x2::sui::SUI",
    });
    const stakeMist = Math.floor(stake * 1_000_000_000);
    const coin = coins.find((c) => parseInt(c.balance) >= stakeMist);
    if (!coin) {
      return;
    }
    const tx = new Transaction();

    const [stakeCoin] = tx.splitCoins(tx.object(coin.coinObjectId), [
      tx.pure.u64(stakeMist),
    ]);

    tx.moveCall({
      target: `${PACKAGE_ID}::gomotix::create_room`,
      arguments: [stakeCoin],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("Transaction digest:", result.digest);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <ContentContainer
      title="New Game"
      description="Create a new Gomotix game to play with friends or random players."
    >
      <div className="flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-extrabold">New Game</Button>
          </DialogTrigger>
          <DialogContent className="w-96">
            <DialogHeader>
              <DialogTitle>Create a New Gomotix Game</DialogTitle>
              <DialogDescription>
                Set up your game preferences and invite friends to join you in a
                Gomotix match!
              </DialogDescription>
            </DialogHeader>
            <NewGameForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
    </ContentContainer>
  );
}
