import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createWhatsAppOrder } from "../api/orders";
import "../styles/Cart.css";

// ✅ Money formatter (NGN with commas + 2 decimals)
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function Cart() {
  const navigate = useNavigate();

  const { cart, removeFromCart, setQty, subtotal, clearCart } = useCart();

  // ✅ WhatsApp Order Handler (creates order in backend first)
  const handleWhatsAppOrder = async () => {
    try {
      if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      // Ask customer info (later we can replace with a modal)
      const full_name = prompt("Enter your full name:");
      if (!full_name) return;

      const phone = prompt("Enter your phone number:");
      if (!phone) return;

      const order_type =
        (prompt("Type DELIVERY or PICKUP (default is PICKUP):") || "PICKUP")
          .toUpperCase()
          .trim();

      let delivery_address = "";
      let landmark = "";

      if (order_type === "DELIVERY") {
        delivery_address = prompt("Enter delivery address:");
        if (!delivery_address) {
          alert("Delivery address is required for DELIVERY.");
          return;
        }

        landmark = prompt("Enter landmark (optional):") || "";
      }

      // ✅ Build payload for backend
      const payload = {
        full_name,
        phone,
        email: "",
        order_type,
        delivery_address,
        landmark,
        payment_method: "PAY_ON_DELIVERY",

        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          notes: item.notes || "",
        })),
      };

      // ✅ Create order in backend
      const res = await createWhatsAppOrder(payload);

      // ✅ Clear cart AFTER order has been saved successfully
      clearCart();

      // ✅ Open WhatsApp URL
      if (res.whatsapp_url) {
        window.open(res.whatsapp_url, "_blank", "noopener,noreferrer");
      } else {
        alert("Order created successfully but WhatsApp is not configured.");
      }

      // ✅ Redirect to confirmation page
      navigate(`/order-confirmed/${res.order_no}`);
    } catch (err) {
      alert(err.message || "Failed to place WhatsApp order.");
    }
  };

  // EMPTY CART STATE
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="empty-cart-btn">
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

              {x.notes && <div className="cart-notes">Note: {x.notes}</div>}
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
                disabled={x.quantity <= 1}
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

            <button className="remove-btn" onClick={() => removeFromCart(idx)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* SUMMARY */}
      <div className="cart-summary">
        <p className="subtotal-row">
          <span>Subtotal: </span>
          <span className="subtotal-amount">₦{formatMoney(subtotal)}</span>
        </p>

        {/* Normal checkout */}
        <button onClick={() => navigate("/checkout")} className="checkout-btn">
          Proceed to Checkout
        </button>

        {/* WhatsApp checkout */}
        <button onClick={handleWhatsAppOrder} className="whatsapp-btn">
          Order via WhatsApp Instead
        </button>
      </div>
    </div>
  );
}
