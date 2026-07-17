import { AnalysisResult } from "./analyzer";

export interface PredictionResult {
  side: "K" | "B";
  confidence: number;
  scoreK: number;
  scoreB: number;
  recommendation: "BET";
  reason: string[];
}

export function predict(a: AnalysisResult): PredictionResult {

  let scoreK = 50;
  let scoreB = 50;

  const reason: string[] = [];

  if (a.winRateK > a.winRateB) {
    scoreK += (a.winRateK - a.winRateB) * 0.4;
    reason.push("Winrate K unggul");
  } else if (a.winRateB > a.winRateK) {
    scoreB += (a.winRateB - a.winRateK) * 0.4;
    reason.push("Winrate B unggul");
  }

  if (a.trend === "K") {
    scoreK += 10;
    reason.push("Trend K");
  } else if (a.trend === "B") {
    scoreB += 10;
    reason.push("Trend B");
  }

  if (a.momentum === "K") {
    scoreK += 10;
    reason.push("Momentum K");
  } else if (a.momentum === "B") {
    scoreB += 10;
    reason.push("Momentum B");
  }

  if (a.streakK >= 2 && a.streakK < 4) {
    scoreK += a.streakK * 3;
    reason.push("Streak K");
  }

  if (a.streakB >= 2 && a.streakB < 4) {
    scoreB += a.streakB * 3;
    reason.push("Streak B");
  }

  if (a.streakK >= 4) {
    scoreK -= 12;
    scoreB += 12;
    reason.push("Streak K ≥4, potensi berbalik ke B");
  }

  if (a.streakB >= 4) {
    scoreB -= 12;
    scoreK += 12;
    reason.push("Streak B ≥4, potensi berbalik ke K");
  }

  if (a.maxStreakK > a.maxStreakB) {
    scoreK += 5;
  } else if (a.maxStreakB > a.maxStreakK) {
    scoreB += 5;
  }

  if (a.repeatK > a.repeatB) {
    scoreK += (a.repeatK - a.repeatB) * 2;
    reason.push("Repeat K dominan");
  }

  if (a.repeatB > a.repeatK) {
    scoreB += (a.repeatB - a.repeatK) * 2;
    reason.push("Repeat B dominan");
  }

  if (a.score20K > a.score20B) {
    scoreK += 4;
    reason.push("2-0 K dominan");
  }

  if (a.score20B > a.score20K) {
    scoreB += 4;
    reason.push("2-0 B dominan");
  }

  if (a.score21K > a.score21B) {
    scoreK += 2;
  }

  if (a.score21B > a.score21K) {
    scoreB += 2;
  }

  scoreK += (a.last3K - a.last3B) * 3;
  scoreB += (a.last3B - a.last3K) * 3;

  scoreK += (a.last5K - a.last5B) * 2;
  scoreB += (a.last5B - a.last5K) * 2;

  scoreK += (a.last10K - a.last10B);
  scoreB += (a.last10B - a.last10K);

  scoreK += (a.last20K - a.last20B) * 0.8;
  scoreB += (a.last20B - a.last20K) * 0.8;
  
    if (a.zigzagCount >= 3) {
    scoreK += 2;
    scoreB += 2;
    reason.push("Pola zigzag");
  }

  if (a.switches <= a.totalGames * 0.4) {
    scoreK += 2;
    scoreB += 2;
    reason.push("Switch rendah");
  }

  scoreK += a.matchedPatterns;
  scoreB += a.matchedPatterns;

  let side: "K" | "B";

  const diff = Math.abs(scoreK - scoreB);

  if (diff <= 3) {

    if (a.winK < a.winB) {
      side = "K";
      reason.push("Pola belum kuat, total K lebih sedikit");
    } else if (a.winB < a.winK) {
      side = "B";
      reason.push("Pola belum kuat, total B lebih sedikit");
    } else {
      side = scoreK >= scoreB ? "K" : "B";
      reason.push("Total K/B seimbang");
    }

  } else {

    side = scoreK >= scoreB ? "K" : "B";

  }

  const confidence = Math.min(
    90,
    Math.max(
      55,
      Math.round(
        60 +
        diff * 0.8 +
        a.matchedPatterns
      )
    )
  );

  return {
    side,
    confidence,
    scoreK: Math.round(scoreK),
    scoreB: Math.round(scoreB),
    recommendation: "BET",
    reason
  };
}
