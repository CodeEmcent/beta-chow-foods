// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/logo.jpeg"; // adjust path if needed

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* BRAND */}
        <div className="footer-brand">
          <Link to="/" className="footer-brand-link">
            <img src={logo} alt="Beta Chow Foods Logo" />
            <span>Beta Chow Foods</span>
          </Link>
          <p>
            Authentic Nigerian meals, freshly prepared and delivered across
            Lagos.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📍 5 Abule Okuta Road Bariga Lagos, Nigeria</p>
          <p>
            📞{" "}
            <a
              href="https://wa.me/2348060854010"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: 0806 085 4010
            </a>
          </p>
          <p>🚚 Delivering across major Lagos areas</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <small>
          © {new Date().getFullYear()} Beta Chow Foods. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
