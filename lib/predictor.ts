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

const winGap = Math.abs(a.winRateK - a.winRateB);

if (a.winRateK > a.winRateB) {
  scoreK += Math.min(12, winGap * 0.35);
  reason.push("Winrate K unggul");
}

if (a.winRateB > a.winRateK) {
  scoreB += Math.min(12, winGap * 0.35);
  reason.push("Winrate B unggul");
}
  if (a.trend === "K") {
  scoreK += 8;
  reason.push("Trend K");
}

if (a.trend === "B") {
  scoreB += 8;
  reason.push("Trend B");
}

 if (a.momentum === "K") {
  scoreK += 6;
  reason.push("Momentum K");
}

if (a.momentum === "B") {
  scoreB += 6;
  reason.push("Momentum B");
}

  // Streak K
if (a.streakK === 2) {
  scoreK += 4;
  reason.push("Streak K x2");
} else if (a.streakK === 3) {
  scoreK += 6;
  reason.push("Streak K x3");
} else if (a.streakK === 4) {
  scoreK += 2;
  scoreB += 4;
  reason.push("Streak K mulai jenuh");
} else if (a.streakK >= 5) {
  scoreK -= 6;
  scoreB += 8;
  reason.push("Streak K sangat jenuh");
}

// Streak B
if (a.streakB === 2) {
  scoreB += 4;
  reason.push("Streak B x2");
} else if (a.streakB === 3) {
  scoreB += 6;
  reason.push("Streak B x3");
} else if (a.streakB === 4) {
  scoreB += 2;
  scoreK += 4;
  reason.push("Streak B mulai jenuh");
} else if (a.streakB >= 5) {
  scoreB -= 6;
  scoreK += 8;
  reason.push("Streak B sangat jenuh");
}

const repeatGap = Math.abs(a.repeatK - a.repeatB);

if (a.repeatK > a.repeatB) {
  scoreK += Math.min(6, repeatGap * 1.5);

  if (a.repeatK >= 4) {
    scoreK -= 2;
    scoreB += 2;
    reason.push("Repeat K mulai jenuh");
  } else {
    reason.push("Repeat K dominan");
  }
}

if (a.repeatB > a.repeatK) {
  scoreB += Math.min(6, repeatGap * 1.5);

  if (a.repeatB >= 4) {
    scoreB -= 2;
    scoreK += 2;
    reason.push("Repeat B mulai jenuh");
  } else {
    reason.push("Repeat B dominan");
  }
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

  // Last 3 (paling penting)
const gap3 = a.last3K - a.last3B;

scoreK += gap3 * 4;
scoreB -= gap3 * 4;

// Last 5
const gap5 = a.last5K - a.last5B;

scoreK += gap5 * 2.5;
scoreB -= gap5 * 2.5;

// Last 10
const gap10 = a.last10K - a.last10B;

scoreK += gap10 * 1.5;
scoreB -= gap10 * 1.5;

// Last 20
const gap20 = a.last20K - a.last20B;

scoreK += gap20;
scoreB -= gap20;

// Konfirmasi jika semua timeframe searah
if (
  Math.sign(gap3) === Math.sign(gap5) &&
  Math.sign(gap5) === Math.sign(gap10) &&
  gap3 !== 0
) {
  if (gap3 > 0) {
    scoreK += 5;
    reason.push("Momentum K terkonfirmasi");
  } else {
    scoreB += 5;
    reason.push("Momentum B terkonfirmasi");
  }
}
if (
  Math.sign(gap3) !== Math.sign(gap20) &&
  gap3 !== 0 &&
  gap20 !== 0
) {
  if (gap3 > 0) {
    scoreK += 3;
    reason.push("Potensi reversal ke K");
  } else {
    scoreB += 3;
    reason.push("Potensi reversal ke B");
  }
}
  
    if (a.zigzagCount >= 3 && a.zigzagCount <= 5) {
  scoreK += 3;
  scoreB += 3;
  reason.push("Zigzag stabil");
}

if (a.zigzagCount > 5) {
  scoreK += 1;
  scoreB += 1;
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

  let confidence = 50;

// Selisih skor
confidence += Math.min(diff * 0.8, 20);

// Banyak pola yang cocok
confidence += a.matchedPatterns * 2;

// Trend + Momentum searah
if (
  (a.trend === "K" && a.momentum === "K") ||
  (a.trend === "B" && a.momentum === "B")
) {
  confidence += 6;
}

// Last3 dan Last5 searah
if (
  (a.last3K > a.last3B && a.last5K > a.last5B) ||
  (a.last3B > a.last3K && a.last5B > a.last5K)
) {
  confidence += 4;
}

// Zigzag tinggi = kurangi keyakinan
if (a.zigzagCount >= 4) {
  confidence -= 3;
}

// Streak terlalu panjang = kurangi keyakinan
if (a.streakK >= 5 || a.streakB >= 5) {
  confidence -= 5;
}

// Batasi confidence
confidence = Math.max(55, Math.min(90, Math.round(confidence)));
  return {
    side,
    confidence,
    scoreK: Math.round(scoreK),
    scoreB: Math.round(scoreB),
    recommendation: "BET",
    reason
  };
}
