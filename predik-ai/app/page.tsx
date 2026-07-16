"use client";

import { useState } from "react";

export default function Home() {
const [lw,setLw] = useState("");

const [result,setResult] = useState<{
  prediction:string;
  confidence:number;
} | null>(null);

const [loading,setLoading] = useState(false);

  async function handleAnalyze(){

  if(!lw.trim()){
    return;
  }

  setLoading(true);

  try{

    const res = await fetch("/api/predict",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        lw
      })
    });


    const data = await res.json();


    if(data.success){

      setResult({
        prediction:data.prediction,
        confidence:data.confidence
      });

    }

  }finally{

    setLoading(false);

  }

}
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#09090b",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#18181b",
          border: "1px solid #7c3aed",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 0 40px rgba(139,92,246,.35)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "8px",
          }}
        >
          🎯 Predik AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#a1a1aa",
            marginBottom: "24px",
          }}
        >
          AI Pattern Analyzer
        </p>


        <textarea
          value={lw}
          onChange={(e)=>setLw(e.target.value)}
          placeholder="Tempel LW di sini..."
          style={{
            width: "100%",
            height: "220px",
            background: "#09090b",
            color: "#fff",
            border: "1px solid #7c3aed",
            borderRadius: "16px",
            padding: "16px",
            resize: "none",
            marginBottom: "20px",
          }}
        />


        <button
          onClick={handleAnalyze}
          style={{
            width: "100%",
            height: "52px",
            borderRadius: "16px",
            background:
              "linear-gradient(90deg,#8b5cf6,#6d28d9)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "⏳ MENGANALISA..." : "🔮 ANALISA SEKARANG"}
        </button>


        {result && (
          <div
            style={{
              marginTop:"24px",
              padding:"18px",
              borderRadius:"16px",
              background:"#09090b",
              border:"1px solid #7c3aed",
              textAlign:"center",
            }}
          >

            <div
              style={{
                color:"#a1a1aa",
                marginBottom:"8px",
              }}
            >
              HASIL PREDIKSI
            </div>

            <h2
              style={{
                fontSize:"28px",
                marginBottom:"8px",
              }}
            >
              {result.prediction}
            </h2>

            <p>
              Confidence {result.confidence}%
            </p>

          </div>
        )}

      </div>
    </main>
  );
}