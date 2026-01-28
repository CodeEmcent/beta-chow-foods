import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.jpeg";
import "../styles/NavBar.css";

export default function NavBar() {
  const { cart } = useCart();
  const count = cart.reduce((s, x) => s + x.quantity, 0);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LEFT: LOGO + BRAND (both clickable) */}
        <Link to="/" className="nav-left">
          <img src={logo} alt="Beta Chow Logo" className="nav-logo" />
          <span className="nav-brand">Beta Chow Foods</span>
        </Link>

        {/* RIGHT: NAVIGATION */}
        <nav className="nav-right">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/track">Track Order</NavLink>
          <NavLink to="/cart">Cart ({count})</NavLink>
        </nav>
      </div>
    </header>
  );
}
