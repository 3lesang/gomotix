import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertLargeNumberToString(num: number): string {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`;
  }
  return num.toString();
}

export function checkWinnerMap(
  board: Map<string, string>,
  row: number,
  col: number,
  player: string
): { winner: string; line: Set<string> } | null {
  const directions = [
    [0, 1], // →
    [1, 0], // ↓
    [1, 1], // ↘
    [1, -1], // ↙
  ];

  const getKey = (r: number, c: number) => `${r},${c}`;

  for (const [dx, dy] of directions) {
    const line = new Set<string>();
    line.add(getKey(row, col));

    // Forward
    for (let i = 1; i < 5; i++) {
      const r = row + dx * i;
      const c = col + dy * i;
      if (board.get(getKey(r, c)) !== player) break;
      line.add(getKey(r, c));
    }

    // Backward
    for (let i = 1; i < 5; i++) {
      const r = row - dx * i;
      const c = col - dy * i;
      if (board.get(getKey(r, c)) !== player) break;
      line.add(getKey(r, c));
    }

    if (line.size >= 5) {
      return { winner: player, line };
    }
  }

  return null;
}

export const formatBalance = (balance: string) => {
  return (Number(balance) / 1_000_000_000).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
