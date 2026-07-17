import { ParsedLW } from "./parser";

export interface AnalysisResult {
  totalGames: number;

  winK: number;
  winB: number;

  score20K: number;
  score21K: number;

  score20B: number;
  score21B: number;

  streakK: number;
  streakB: number;

  maxStreakK: number;
  maxStreakB: number;

  repeatK: number;
  repeatB: number;

  zigzagCount: number;

  last3K: number;
  last3B: number;

  last5K: number;
  last5B: number;

  last10K: number;
  last10B: number;

  last20K: number;
  last20B: number;

  winRateK: number;
  winRateB: number;

  switches: number;

  totalAmount: number;
  averageAmount: number;

  netSaldo: number;

  matchedPatterns: number;

  trend: "K" | "B" | "BALANCE";

  momentum: "K" | "B" | "NONE";
}

export function analyze(data: ParsedLW): AnalysisResult {

let winK = 0;
let winB = 0;

let score20K = 0;
let score21K = 0;

let score20B = 0;
let score21B = 0;

let totalAmount = 0;

let streakK = 0;
let streakB = 0;

let maxStreakK = 0;
let maxStreakB = 0;

let currentK = 0;
let currentB = 0;

let repeatK = 0;
let repeatB = 0;

let zigzagCount = 0;

  for (const game of data.games) {

    totalAmount += game.amount;

    if (game.side === "K") {

      winK++;

      if (game.score === "2-0")
        score20K++;
      else
        score21K++;

    } else {

      winB++;

      if (game.score === "2-0")
        score20B++;
      else
        score21B++;

    }

  }

for (let i = 0; i < data.games.length; i++) {

  const g = data.games[i];

  if (g.side === "K") {

    currentK++;
    currentB = 0;

    maxStreakK = Math.max(maxStreakK, currentK);

  } else {

    currentB++;
    currentK = 0;

    maxStreakB = Math.max(maxStreakB, currentB);

  }

  if (i > 0 && g.side === data.games[i - 1].side) {

    if (g.side === "K")
      repeatK++;
    else
      repeatB++;

  }

  if (
    i >= 2 &&
    data.games[i].side !== data.games[i - 1].side &&
    data.games[i - 1].side !== data.games[i - 2].side
  ) {
    zigzagCount++;
  }

}
  for (let i = data.games.length - 1; i >= 0; i--) {

    const g = data.games[i];

    if (g.side === "K") {

      if (streakB > 0) break;

      streakK++;

    } else {

      if (streakK > 0) break;

      streakB++;

    }

  }
const netSaldo = data.saldo - data.debt;
const last3 = data.games.slice(-3);
const last5 = data.games.slice(-5);
const last10 = data.games.slice(-10);
const last20 = data.games.slice(-20);

let last3K = 0;
let last3B = 0;

  let last5K = 0;
  let last5B = 0;

  let last10K = 0;
  let last10B = 0;

  let last20K = 0;
  let last20B = 0;

  for (const g of last5) {
    if (g.side === "K")
      last5K++;
    else
      last5B++;
  }
  
  for (const g of last3) {
  if (g.side === "K")
    last3K++;
  else
    last3B++;
}

  for (const g of last10) {
    if (g.side === "K")
      last10K++;
    else
      last10B++;
  }

  for (const g of last20) {
    if (g.side === "K")
      last20K++;
    else
      last20B++;
  }

  let switches = 0;

  for (let i = 1; i < data.games.length; i++) {
    if (data.games[i].side !== data.games[i - 1].side)
      switches++;
  }

  const totalGames = data.games.length;

  const winRateK = totalGames
    ? Number(((winK / totalGames) * 100).toFixed(1))
    : 0;

  const winRateB = totalGames
    ? Number(((winB / totalGames) * 100).toFixed(1))
    : 0;

  let matchedPatterns = 0;

  // Dominasi winrate
  if (Math.abs(winRateK - winRateB) >= 15)
    matchedPatterns++;

  // Streak kuat
  if (streakK >= 3 || streakB >= 3)
    matchedPatterns++;

  // Last 5
  if (Math.abs(last5K - last5B) >= 3)
    matchedPatterns++;

  // Last 10
  if (Math.abs(last10K - last10B) >= 4)
    matchedPatterns++;

  // Last 20
  if (Math.abs(last20K - last20B) >= 6)
    matchedPatterns++;

  // Dominasi 2-0
  if (Math.abs(score20K - score20B) >= 2)
    matchedPatterns++;

  // Pergantian rendah
  if (switches <= totalGames * 0.4)
    matchedPatterns++;
    
if (totalGames >= 10) {

  if (repeatK >= 2 || repeatB >= 2)
    matchedPatterns++;

  if (zigzagCount >= 2)
    matchedPatterns++;

  if (maxStreakK >= 4 || maxStreakB >= 4)
    matchedPatterns++;

}

let trend: "K" | "B" | "BALANCE" = "BALANCE";

if (last20K > last20B)
  trend = "K";
else if (last20B > last20K)
  trend = "B";

let momentum: "K" | "B" | "NONE" = "NONE";

if (last3K === 3)
  momentum = "K";
else if (last3B === 3)
  momentum = "B";
else if (last3K === 2)
  momentum = "K";
else if (last3B === 2)
  momentum = "B";

if (totalGames === 0) {
  return {
    totalGames: 0,

    winK: 0,
    winB: 0,

    score20K: 0,
    score21K: 0,

    score20B: 0,
    score21B: 0,

    streakK: 0,
    streakB: 0,

    maxStreakK: 0,
    maxStreakB: 0,

    repeatK: 0,
    repeatB: 0,

    zigzagCount: 0,

    last3K: 0,
    last3B: 0,

    last5K: 0,
    last5B: 0,

    last10K: 0,
    last10B: 0,

    last20K: 0,
    last20B: 0,

    winRateK: 0,
    winRateB: 0,

    switches: 0,

    totalAmount: 0,
    averageAmount: 0,

    netSaldo,

    matchedPatterns: 0,

    trend: "BALANCE",
    momentum: "NONE"
  };
}
  return {
  totalGames,

  winK,
  winB,

  score20K,
  score21K,

  score20B,
  score21B,

  streakK,
  streakB,

  maxStreakK,
  maxStreakB,

  repeatK,
  repeatB,

  zigzagCount,

  last3K,
  last3B,

  last5K,
  last5B,

  last10K,
  last10B,

  last20K,
  last20B,

  winRateK,
  winRateB,

  switches,

  totalAmount,

  averageAmount: Math.round(totalAmount / totalGames),

  netSaldo,

  matchedPatterns,

  trend,

  momentum
   };
}
