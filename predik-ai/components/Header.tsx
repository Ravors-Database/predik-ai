export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "22px",
        borderBottom: "1px solid rgba(139,92,246,.2)",
        background:
          "linear-gradient(180deg,#18181b 0%,#0f0f13 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#7c3aed,#9333ea)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "26px",
            boxShadow: "0 0 30px rgba(139,92,246,.45)",
          }}
        >
          🔮
        </div>

        <div>
          <h1
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            Predik AI
          </h1>

          <p
            style={{
              marginTop: "6px",
              color: "#a1a1aa",
              fontSize: "14px",
            }}
          >
            Telegram Mini App • AI Prediction Engine
          </p>
        </div>
      </div>
    </header>
  );
}