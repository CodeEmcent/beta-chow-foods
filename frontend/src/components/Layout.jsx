import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
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
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
