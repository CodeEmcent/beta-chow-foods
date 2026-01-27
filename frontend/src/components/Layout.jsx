import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <main style={{ flex: 1, maxWidth: 1000, width: "100%", margin: "0 auto", padding: 16 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
