import { NextResponse } from "next/server";

import { parseLW } from "@/lib/parser";
import { analyze } from "@/lib/analyzer";
import { predict } from "@/lib/predictor";

export async function POST(req: Request) {
  try {
    const { lw } = await req.json();

    if (!lw || typeof lw !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "LW kosong"
        },
        {
          status: 400
        }
      );
    }

    const parsed = parseLW(lw);

    // Minimal harus ada 5 GAME
    if (parsed.games.length < 5) {
      return NextResponse.json({
        success: true,
        prediction: null,
        confidence: 0,
        message: "Data GAME belum cukup untuk diprediksi."
      });
    }

    const analysis = analyze(parsed);

    const result = predict(analysis);

    return NextResponse.json({
      success: true,
      prediction: result.side,
      confidence: result.confidence,
      scoreK: result.scoreK,
      scoreB: result.scoreB,
      reason: result.reason,
      message: "Prediksi tersedia."
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "AI gagal memproses data"
      },
      {
        status: 500
      }
    );
  }
}
