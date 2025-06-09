import { Link } from "@tanstack/react-router";
import CustomConnectButton from "./CustomConnectButton";

export default function Header() {
  return (
    <header className="p-2 flex items-center gap-2">
      <Link to="/" className="hover:underline">
        <h1 className="text-2xl font-bold">Gomotix.io</h1>
      </Link>
      <nav className="flex gap-2">
        <Link to="/room" className="hover:underline">
          New Game
        </Link>
        <Link to="/swap" className="hover:underline">
          Swap
        </Link>
        <Link to="/leaderboard" className="hover:underline">
          Leaderboard
        </Link>
      </nav>
      <div className="flex-1" />
      <CustomConnectButton />
    </header>
  );
}
