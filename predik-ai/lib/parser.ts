export type Side = "K" | "B";
export type Score = "2-0" | "2-1";

export interface GameResult {
  index: number;
  side: Side;
  score: Score;
  amount: number;
}

export interface Player {
  name: string;
  balance: number;
}

export interface ParsedLW {
  dev?: string;
  rol?: string;
  lastWin?: string;

  saldo: number;
  debt: number;

  players: Player[];
  games: GameResult[];
}

export function parseLW(text: string): ParsedLW {
  const result: ParsedLW = {
    saldo: 0,
    debt: 0,
    players: [],
    games: []
  };

  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map(v => v.trim())
    .filter(Boolean);

  for (const line of lines) {

    // DEV
    if (/^DEV\s*:/i.test(line)) {
      result.dev = line.split(":").slice(1).join(":").trim();
      continue;
    }

    // ROL
    if (/^ROL\s*:/i.test(line)) {
      result.rol = line.split(":").slice(1).join(":").trim();
      continue;
    }

    // LAST WIN
    if (/^LAST WIN/i.test(line)) {
      result.lastWin = line.split(":").slice(1).join(":").trim();
      continue;
    }

    // SALDO
    if (/^SALDO PEMAIN/i.test(line)) {
      const m = line.match(/\d+/g);

      if (m)
        result.saldo = Number(m.join(""));
      continue;
    }

    // BONDEP
    if (/^BONDEP/i.test(line)) {
      const m = line.match(/-?\d+/);

      if (m)
        result.debt = Math.abs(Number(m[0]));
      continue;
    }

 // GAME
if (/^GAME\s+\d+/i.test(line)) {

  const index =
    Number(line.match(/\d+/)?.[0] || 0);


  let side: Side = "K";

  if (/\bK\b/i.test(line)) {
    side = "K";
  }

  if (/\bB\b/i.test(line)) {
    side = "B";
  }


  const score: Score =
    line.includes("2-0")
      ? "2-0"
      : "2-1";


  const nums = line.match(/\d+/g) || [];


  const amount =
    nums.length
      ? Number(nums[nums.length - 1])
      : 0;


  result.games.push({
    index,
    side,
    score,
    amount
  });


  continue;
}

    const player =
      line.match(/^([A-Za-z0-9_]+)\s+(\d+)$/);

    if (player) {

      result.players.push({
        name: player[1],
        balance: Number(player[2])
      });

    }

  }

  return result;
}