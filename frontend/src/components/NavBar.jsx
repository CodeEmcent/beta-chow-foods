import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { isLoggedIn, logout } from "../utils/auth";
import logo from "../assets/logo.jpeg";
import "../styles/NavBar.css";

export default function NavBar() {
  const { cart } = useCart();
  const count = cart.reduce((s, x) => s + x.quantity, 0);
  const loggedIn = isLoggedIn();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!menuOpen) return;

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close menu when route changes (link click)
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LEFT: LOGO + BRAND */}
        <Link to="/" className="nav-left" onClick={closeMenu}>
          <img src={logo} alt="Beta Chow Logo" className="nav-logo" />
          <span className="nav-brand">Beta Chow Foods</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="nav-right">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/track">Track Order</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>

          {loggedIn && <NavLink to="/my-orders">My Orders</NavLink>}
          {loggedIn && <NavLink to="/cart">Cart ({count})</NavLink>}

          {!loggedIn && (
            <NavLink className="nav-login" to="/login">
              Login
            </NavLink>
          )}

          {!loggedIn && (
            <NavLink className="nav-signup" to="/signup">
              Signup
            </NavLink>
          )}

          {loggedIn && <NavLink to="/profile">Profile</NavLink>}

          {loggedIn && (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </nav>

        {/* HAMBURGER ICON */}
        <button
          ref={hamburgerRef}
          className={menuOpen ? "hamburger open" : "hamburger"}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* OVERLAY */}
      <div className={menuOpen ? "mobile-overlay show" : "mobile-overlay"}></div>

      {/* MOBILE SLIDE MENU */}
      <div
        ref={menuRef}
        className={menuOpen ? "mobile-menu open" : "mobile-menu"}
      >
        <div className="mobile-menu-header">
          <span>Beta Chow Foods</span>
          <button className="close-btn" onClick={closeMenu}>
            ✕
          </button>
        </div>

        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/menu" onClick={closeMenu}>
          Menu
        </NavLink>

        <NavLink to="/track" onClick={closeMenu}>
          Track Order
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About Us
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact Us
        </NavLink>

        {loggedIn && (
          <NavLink to="/my-orders" onClick={closeMenu}>
            My Orders
          </NavLink>
        )}

        {loggedIn && (
          <NavLink to="/cart" onClick={closeMenu}>
            Cart ({count})
          </NavLink>
        )}

        {loggedIn && (
          <NavLink to="/profile" onClick={closeMenu}>
            Profile
          </NavLink>
        )}

        {!loggedIn && (
          <NavLink className="nav-login mobile-btn" to="/login" onClick={closeMenu}>
            Login
          </NavLink>
        )}

        {!loggedIn && (
          <NavLink className="nav-signup mobile-btn" to="/signup" onClick={closeMenu}>
            Signup
          </NavLink>
        )}

        {loggedIn && (
          <button
            className="logout-btn mobile-logout"
            onClick={() => {
              logout();
              closeMenu();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}