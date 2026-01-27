import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import "../styles/Checkout.css";

export default function Checkout() {
  const nav = useNavigate();
  const { cart, subtotal, emptyCart } = useCart();

  const [full_name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [order_type, setOrderType] = useState("DELIVERY");
  const [delivery_address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");

  const [payment_method, setPaymentMethod] = useState("PAY_ON_DELIVERY");
  const [payment_reference, setPaymentRef] = useState("");

  // Lagos Delivery Zones
  const deliveryZones = {
    YABA: 500,
    SURULERE: 700,
    SHOMOLU: 600,
    BARIGA: 600,
  };

  const [zone, setZone] = useState("YABA");

  const delivery_fee = order_type === "DELIVERY" ? deliveryZones[zone] : 0;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const itemsPayload = useMemo(() => cart.map((x) => ({
    menu_item_id: x.id,
    quantity: x.quantity,
    notes: x.notes || "",
  })), [cart]);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (cart.length === 0) return setErr("Cart is empty.");
    if (!full_name.trim()) return setErr("Full name is required.");
    if (!phone.trim()) return setErr("Phone number is required.");
    if (order_type === "DELIVERY" && !delivery_address.trim())
      return setErr("Delivery address is required.");

    try {
      setLoading(true);

      const payload = {
        full_name,
        phone,
        email,
        order_type,
        delivery_address,
        landmark,
        payment_method,
        payment_reference,
        delivery_fee: String(delivery_fee),
        items: itemsPayload,
      };

      const res = await createOrder(payload);
      emptyCart();
      nav(`/order-confirmed/${res.order_no}`);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p>Your cart is empty. Go back to the menu.</p>
      </div>
    );
  }

  const total = subtotal + delivery_fee;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {err ? <p className="error-text">{err}</p> : null}

      <form onSubmit={submit} className="checkout-form">

        {/* CUSTOMER DETAILS */}
        <div className="checkout-card">
          <h3>Customer Details</h3>
          <input
            className="input"
            placeholder="Full name"
            value={full_name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Phone (e.g. 080...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="input"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* DELIVERY / PICKUP */}
        <div className="checkout-card">
          <h3>Delivery / Pickup</h3>
          <select
            className="select"
            value={order_type}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="DELIVERY">Delivery</option>
            <option value="PICKUP">Pickup</option>
          </select>

          {order_type === "DELIVERY" && (
            <>
              <textarea
                className="textarea"
                placeholder="Delivery address"
                value={delivery_address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="input"
                placeholder="Nearest landmark (optional)"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />

              <label className="zone-label">Delivery Zone</label>
              <select
                className="select"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              >
                <option value="YABA">Yaba – ₦500</option>
                <option value="SURULERE">Surulere – ₦700</option>
                <option value="SHOMOLU">Shomolu – ₦600</option>
                <option value="BARIGA">Bariga – ₦600</option>
              </select>

              <p><b>Delivery Fee:</b> ₦{delivery_fee}</p>
            </>
          )}
        </div>

        {/* PAYMENT */}
        <div className="checkout-card">
          <h3>Payment</h3>
          <select
            className="select"
            value={payment_method}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="PAY_ON_DELIVERY">Pay on Delivery</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
          </select>

          {payment_method === "BANK_TRANSFER" && (
            <>
              <p className="payment-note">
                Transfer to: <b>(Add account details later)</b> and enter payment reference below.
              </p>
              <input
                className="input"
                placeholder="Payment reference (optional)"
                value={payment_reference}
                onChange={(e) => setPaymentRef(e.target.value)}
              />
            </>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="checkout-summary">
          <p><b>Subtotal:</b> ₦{subtotal.toFixed(2)}</p>
          <p><b>Delivery Fee:</b> ₦{delivery_fee.toFixed(2)}</p>
          <p><b>Total:</b> ₦{total.toFixed(2)}</p>
          <button disabled={loading} className="btn" style={{ width: "100%" }}>
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </div>

      </form>
    </div>
  );
}
