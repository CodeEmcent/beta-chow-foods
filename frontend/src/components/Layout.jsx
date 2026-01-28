import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <NavBar />

      <main
        style={{
          flex: 1,
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
