import React from "react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #333", padding: 16 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <small>© {new Date().getFullYear()} Beta Chow Foods</small>
      </div>
    </footer>
  );
}
