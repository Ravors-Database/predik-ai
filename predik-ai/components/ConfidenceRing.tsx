type Props = {
  value: number;
};

export default function ConfidenceRing({ value }: Props) {
  return (
    <div
      style={{
        width: 140,
        height: 140,
        borderRadius: "50%",
        border: "8px solid #7c3aed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        margin: "20px auto",
        boxShadow: "0 0 25px rgba(168,85,247,.4)",
      }}
    >
      {value}%
    </div>
  );
}