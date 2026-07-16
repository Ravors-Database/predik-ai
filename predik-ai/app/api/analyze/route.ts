import { NextResponse } from "next/server";

import { parseLW } from "@/lib/parser";
import { predict } from "@/lib/predictor";


export async function POST(req: Request) {

  try {

    const { lw } = await req.json();


    if (!lw || typeof lw !== "string") {

      return NextResponse.json(
        {
          success:false,
          message:"LW kosong"
        },
        {
          status:400
        }
      );

    }


    const parsed = parseLW(lw);


    const result = predict(parsed);


    if (result.confidence < 60) {

      return NextResponse.json({

        success:true,

        prediction:null,

        confidence:result.confidence,

        message:"Belum ada pola kuat"

      });

    }


    return NextResponse.json({

      success:true,

      prediction:result.prediction,

      confidence:result.confidence,

      message:"Prediksi tersedia"

    });


  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        success:false,
        message:"AI gagal memproses data"
      },
      {
        status:500
      }
    );

  }

}