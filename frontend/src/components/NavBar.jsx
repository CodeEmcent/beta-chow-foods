import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function NavBar() {
  const { cart } = useCart();
  const count = cart.reduce((s, x) => s + x.quantity, 0);

  return (
    <header style={{ borderBottom: "1px solid #333", padding: 12 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
        <Link to="/" style={{ fontWeight: 800, textDecoration: "none" }}>BETA CHOW FOODS</Link>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/track">Track Order</NavLink>
          <NavLink to="/cart">Cart ({count})</NavLink>
        </nav>
      </div>
    </header>
  );
}
