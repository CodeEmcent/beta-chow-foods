import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

// 👉 Replace this with your real WhatsApp number (no + sign)
const BUSINESS_WHATSAPP = "2347062163979";

export default function Cart() {
  const nav = useNavigate();
  const { cart, removeFromCart, setQty, subtotal } = useCart();

  // Build WhatsApp order message from cart
  const whatsappMessage = encodeURIComponent(
    `Hello Beta Chow Foods, I would like to order:\n\n` +
    cart.map(x => `- ${x.name} x${x.quantity}`).join("\n") +
    `\n\nSubtotal: ₦${subtotal.toFixed(2)}`
  );

  const whatsappLink = `https://wa.me/${BUSINESS_WHATSAPP}?text=${whatsappMessage}`;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="btn">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.map((x, idx) => (
        <div key={idx} className="cart-item">
          <div className="cart-item-header">
            <div>
              <b>{x.name}</b>
              {x.notes ? (
                <div className="cart-notes">Note: {x.notes}</div>
              ) : null}
            </div>
            <div>
              <b>₦{(x.price * x.quantity).toFixed(2)}</b>
            </div>
          </div>

          <div className="cart-controls">
            <button
              className="qty-btn"
              onClick={() => setQty(idx, x.quantity - 1)}
            >
              -
            </button>
            <span>{x.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => setQty(idx, x.quantity + 1)}
            >
              +
            </button>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(idx)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <p><b>Subtotal:</b> ₦{subtotal.toFixed(2)}</p>

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
