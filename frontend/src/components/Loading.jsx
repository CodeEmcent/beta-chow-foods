export default function Loading({ text = "Loading..." }) {
  return (
    <div style={{ padding: 20, textAlign: "center", opacity: 0.8 }}>
      {text}
    </div>
  );
}
