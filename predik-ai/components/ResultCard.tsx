type Props = {
  prediction: string;
  confidence: number;
  trend: string;
};

export default function ResultCard({
  prediction,
  confidence,
  trend,
}: Props) {
  return (
    <div
      style={{
        background: "#18181b",
        borderRadius: 20,
        padding: 24,
        border: "1px solid #7c3aed",
        marginTop: 20,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 18,
        }}
      >
        🔮 Hasil Prediksi
      </h2>

      <div
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#a855f7",
        }}
      >
        {prediction}
      </div>

      <div
        style={{
          marginTop: 16,
          color: "#d4d4d8",
        }}
      >
        Confidence : {confidence}%
      </div>

      <div
        style={{
          color: "#d4d4d8",
        }}
      >
        Trend : {trend}
      </div>
    </div>
  );
}