import React, { useState } from "react";
import { trackOrder } from "../api/orders";
import "../styles/TrackOrder.css";

export default function TrackOrder() {
  const [orderNo, setOrderNo] = useState("");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setData(null);

    if (!orderNo.trim()) return setErr("Enter an order number.");

    try {
      setLoading(true);
      const res = await trackOrder(orderNo.trim());
      setData(res);
    } catch (e2) {
      setErr("Order not found or invalid order number.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="track-order">
      <h1>Track Order</h1>

      <form onSubmit={submit} className="track-form">
        <input
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          placeholder="Enter order number"
          className="input track-input"
        />
        <button disabled={loading} className="btn">
          {loading ? "Tracking..." : "Track"}
        </button>
      </form>

      {loading && <p className="loading-text">Fetching order details...</p>}

      {err ? <p className="error-text">{err}</p> : null}

      {data ? (
        <div className="track-card">
          <p>
            <b>Status:</b>{" "}
            <span className={`status ${data.status}`}>
              {data.status}
            </span>
          </p>
          <p><b>Order Type:</b> {data.order_type}</p>
          <p><b>Total:</b> ₦{data.total}</p>
          <h3>Items</h3>
          <ul className="track-items">
            {data.items.map((it, idx) => (
              <li key={idx}>
                {it.name} x{it.quantity} — ₦{it.unit_price}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
