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
    background:"#09090b",
    color:"white",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"20px",
    position:"relative",
    overflow:"hidden",
  }}
>

  {/* Video Wallpaper */}
  <video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: 0,
  }}
>
  <source
    src="https://ganga--link--ghhzdp9sv8hk.code.run/i/buzm2x6i.mp4"
    type="video/mp4"
  />
</video>
  {/* Gelap transparan */}   
   <div  
    style={{  
      width: "100%",  
      maxWidth: "420px",  
      background: "#18181bcc",  
      borderRadius: "20px",  
      padding: "25px",  
      border: "1px solid #7c3aed",  
      position:"relative",  
      zIndex:2  
    }}  
>
<h1
  style={{
    textAlign: "center",
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "10px 0 25px",
    animation: "float 3s ease-in-out infinite",
    textShadow: "0 0 15px white"
  }}
>
  Dominic Predick
</h1>
        <p style={{
          textAlign:"center",
          color:"#aaa"
        }}>
          AI Dominic Engine
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

<button
  onClick={() => {
    setLw("");
    setResult(null);
    setLoading(false);
  }}
  style={{
    marginTop:"10px",
    width:"100%",
    height:"45px",
    borderRadius:"15px",
    background:"#dc2626",
    color:"white",
    fontWeight:"bold"
  }}
>
  🗑️ HAPUS TEKS
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
