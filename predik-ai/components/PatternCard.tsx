type Props = {
  title: string;
  description: string;
};

export default function PatternCard({
  title,
  description,
}: Props) {
  return (
    <div
      style={{
        background: "#18181b",
        borderRadius: 18,
        padding: 18,
        border: "1px solid #7c3aed",
      }}
    >
      <h3
        style={{
          color: "#fff",
          margin: 0,
          marginBottom: 10,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#cbd5e1",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}