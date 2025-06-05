import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="p-2 flex items-center gap-2">
      <Link to="/" className="hover:underline">
        <h1 className="text-2xl font-bold">Gomoku.io</h1>
      </Link>
      <nav className="flex gap-2">
        <Link to="/room" className="hover:underline">
          New Game
        </Link>
        <Link to="/swap" className="hover:underline">
          Swap
        </Link>
      </nav>
      <div className="flex-1" />
      {/* <ConnectButton /> */}
      <Button>Connect Wallet</Button>
    </header>
  );
}
