import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { isLoggedIn, logout } from "../utils/auth";
import logo from "../assets/logo.jpeg";
import "../styles/NavBar.css";

export default function NavBar() {
  const { cart } = useCart();
  const count = cart.reduce((s, x) => s + x.quantity, 0);
  const loggedIn = isLoggedIn();

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
          <NavLink to="/track">Track Order</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>

          {loggedIn && <NavLink to="/my-orders">My Orders</NavLink>}
          {loggedIn && (<NavLink to="/cart">Cart ({count})</NavLink>)}

          {!loggedIn && <NavLink className="nav-login" to="/login">Login</NavLink>}
          {!loggedIn && <NavLink className="nav-signup" to="/signup">Signup</NavLink>}

          {loggedIn && <NavLink to="/profile">Profile</NavLink>}
          {loggedIn && (<button className="logout-btn" onClick={logout}>Logout</button>)}
        </nav>
      </div>
    </header>
  );
}
