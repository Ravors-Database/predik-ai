"use client";

import { useState } from "react";

export default function Analyzer() {
  const [lw, setLw] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    if (!lw.trim()) {
      alert("Masukkan LW terlebih dahulu.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lw }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <textarea
        value={lw}
        onChange={(e) => setLw(e.target.value)}
        placeholder="Tempel LW di sini..."
        style={{
          width: "100%",
          minHeight: 220,
          padding: 16,
          borderRadius: 16,
          border: "1px solid #8b5cf6",
          background: "#111",
          color: "#fff",
          resize: "none",
          outline: "none",
          fontSize: 15,
        }}
      />

      <button
        onClick={analyze}
        disabled={loading}
        style={{
          padding: 16,
          borderRadius: 16,
          border: "none",
          cursor: "pointer",
          background: "#8b5cf6",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {loading ? "Menganalisa..." : "🔮 ANALISA SEKARANG"}
      </button>

      {result && (
        <div
          style={{
            background: "#18181b",
            padding: 20,
            borderRadius: 18,
            border: "1px solid #8b5cf6",
          }}
        >
          <h2 style={{ color: "#fff", marginTop: 0 }}>
            Hasil Prediksi
          </h2>

          <p style={{ color: "#ddd" }}>
            Prediksi : <b>{result.prediction}</b>
          </p>

          <p style={{ color: "#ddd" }}>
            Confidence : <b>{result.confidence}%</b>
          </p>

          <p style={{ color: "#ddd" }}>
            Trend : <b>{result.trend}</b>
          </p>

          <div style={{ marginTop: 16 }}>
            <b style={{ color: "#fff" }}>Alasan:</b>

            <ul style={{ color: "#bbb" }}>
              {result.reason?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}