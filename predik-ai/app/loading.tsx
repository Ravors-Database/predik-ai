export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#09090b",
        color: "#fff",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            border: "6px solid #27272a",
            borderTop: "6px solid #8b5cf6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px",
          }}
        />

        <h2 style={{ marginBottom: "10px" }}>
          Menganalisa...
        </h2>

        <p style={{ color: "#a1a1aa" }}>
          AI sedang membaca pola LW
        </p>

        <style>{`
          @keyframes spin{
            from{
              transform:rotate(0deg);
            }
            to{
              transform:rotate(360deg);
            }
          }
        `}</style>
      </div>
    </main>
  );
}