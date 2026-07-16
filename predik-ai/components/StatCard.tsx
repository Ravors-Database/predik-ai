type Props = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div
      style={{
        background: "#18181b",
        border: "1px solid #7c3aed",
        borderRadius: 18,
        padding: 18,
        flex: 1,
        minWidth: 140,
      }}
    >
      <div
        style={{
          color: "#a1a1aa",
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 8,
          color: "#fff",
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}