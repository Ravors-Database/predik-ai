"use client";

import { useState } from "react";

export default function Home() {
  const [lw, setLw] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!lw.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lw }),
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#18181b",
          borderRadius: "20px",
          padding: "25px",
          border: "1px solid #7c3aed",
        }}
      >

        <h1 style={{
          textAlign:"center",
          fontSize:"32px"
        }}>
          🎯 Predik AI
        </h1>

        <p style={{
          textAlign:"center",
          color:"#aaa"
        }}>
          AI Pattern Analyzer
        </p>

        <textarea
          value={lw}
          onChange={(e)=>setLw(e.target.value)}
          placeholder="Tempel LW di sini..."
          style={{
            width:"100%",
            height:"200px",
            marginTop:"20px",
            padding:"15px",
            borderRadius:"15px",
            background:"#09090b",
            color:"white"
          }}
        />

        <button
          onClick={handleAnalyze}
          style={{
            marginTop:"20px",
            width:"100%",
            height:"50px",
            borderRadius:"15px",
            background:"#7c3aed",
            color:"white",
            fontWeight:"bold"
          }}
        >
          {loading ? "⏳ MENGANALISA..." : "🔮 ANALISA"}
        </button>

     {result && (
  <div
    style={{
      marginTop:"20px",
      padding:"15px",
      borderRadius:"15px",
      background:"#09090b"
    }}
  >

    {result.prediction ? (
      <>
        <h2>
          🔮 {result.prediction}
        </h2>

        <p>
          Confidence {result.confidence}%
        </p>
      </>
    ) : (
      <>
        <h2>
          ⏳ Belum Ada Prediksi
        </h2>

        <p>
          {result.message}
        </p>
      </>
    )}

  </div>
)}
      

      </div>

    </main>
  );
}
