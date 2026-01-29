import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

// 👉 Replace this with your real WhatsApp number (no + sign)
const BUSINESS_WHATSAPP = "2347062163979";

// ✅ Money formatter (NGN with commas + 2 decimals)
const formatMoney = (amount) =>
  amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function Cart() {
  const nav = useNavigate();
  const { cart, removeFromCart, setQty, subtotal } = useCart();

  // Build WhatsApp order message from cart
  const whatsappMessage = encodeURIComponent(
    `Hello Beta Chow Foods, I would like to order:\n\n` +
      cart.map(x => `- ${x.name} x${x.quantity}`).join("\n") +
      `\n\nSubtotal: ₦${formatMoney(subtotal)}`
  );

  const whatsappLink = `https://wa.me/${BUSINESS_WHATSAPP}?text=${whatsappMessage}`;

  // EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="btn">
          Go to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.map((x, idx) => (
        <div key={idx} className="cart-item">
          {/* ITEM TOP */}
          <div className="cart-item-main">
            <div className="cart-item-info">
              <h3 className="cart-item-name">{x.name}</h3>

              {x.notes && (
                <div className="cart-notes">Note: {x.notes}</div>
              )}
            </div>

            <div className="cart-item-price">
              ₦{formatMoney(x.price * x.quantity)}
            </div>
          </div>

          {/* CONTROLS */}
          <div className="cart-controls">
            <div className="qty-controls">
              <button
                className="qty-btn"
                data-action="decrease"
                onClick={() => setQty(idx, x.quantity - 1)}
              >
                −
              </button>

              <span className="qty-value">{x.quantity}</span>

              <button
                className="qty-btn"
                data-action="increase"
                onClick={() => setQty(idx, x.quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(idx)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* SUMMARY */}
      <div className="cart-summary">
        <p className="subtotal-row">
          <span>Subtotal: </span> 
          <span className="subtotal-amount">
            ₦{formatMoney(subtotal)}
          </span>
        </p>

        {/* Normal checkout */}
        <button
          onClick={() => nav("/checkout")}
          className="btn"
          style={{ width: "100%" }}
        >
          Proceed to Checkout
        </button>

        {/* WhatsApp fallback */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-btn"
        >
          Order via WhatsApp Instead
        </a>
      </div>
    </div>
  );
}
